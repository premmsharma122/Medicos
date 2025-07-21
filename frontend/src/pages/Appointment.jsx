import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import verified_icon from '../assets/verified_icon.svg';
import info_icon from '../assets/info_icon.svg';
import RelatedDocters from '../components/RelatedDocters';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  const dayOfWeeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    if (doctors?.length > 0 && docId) {
      const found = doctors.find((doc) => String(doc._id) === String(docId));
      if (found) {
        console.log(found);
        setDocInfo(found);
      } else {
        toast.error("Doctor not found.");
      }
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const getAvailableSlots = () => {
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const start = new Date(date);
      const end = new Date(date);
      end.setHours(21, 0, 0, 0); // End at 9 PM

      if (i === 0) {
        start.setHours(today.getHours() + 1);
        start.setMinutes(today.getMinutes() > 30 ? 30 : 0);
      } else {
        start.setHours(10, 0, 0, 0); // Start at 10 AM
      }

      const slots = [];
      const slotDateKey = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const bookedTimes = docInfo.slots_booked?.[slotDateKey] || [];

      while (start < end) {
        const timeStr = start.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });

        if (!bookedTimes.includes(timeStr)) {
          slots.push({
            datetime: new Date(start),
            time: timeStr,
          });
        }

        start.setMinutes(start.getMinutes() + 30);
      }

      allSlots.push(slots);
    }

    setDocSlots(allSlots);
  };

  // ✅ Add this function to refetch a single doctor's updated info
  const refetchDoctorInfo = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
      if (data.success) setDocInfo(data.doctor);
    } catch (err) {
      console.error("Failed to refetch doctor info", err);
    }
  };

  const bookAppointment = async () => {
  if (!token) {
    toast.warn('Please login to book an appointment.');
    return navigate('/login');
  }

  try {
    const selectedDate = docSlots[slotIndex][0].datetime;
    const slotDate = selectedDate.toISOString().split('T')[0]; // ✅ "YYYY-MM-DD"
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    console.log("Booking Payload ✅", {
  userId,
  doctorId: docId,
  slotDate,
  slotTime,
  amount: docInfo?.fees,
});

    const { data } = await axios.post(
  `${backendUrl}/api/user/book-appointment`,
  {
    userId,
    doctorId: docId,
    slotDate,
    slotTime,
    amount: docInfo.fees,
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

    

    if (data.success) {
      toast.success(data.message);
      await refetchDoctorInfo();
      getDoctorsData();
      navigate('/my-appointments');
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error(err?.response?.data?.message || "Something went wrong!");
  }
};

  if (!docInfo) return <p style={{ textAlign: 'center' }}>Loading doctor info...</p>;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Doctor Profile */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        <div style={{
          backgroundColor: '#b3d4ff',
          padding: '20px',
          borderRadius: '20px',
          height: '220px',
          width: '220px',
          overflow: 'hidden',
        }}>
          <img
            src={docInfo.image}
            alt={docInfo.name}
            style={{ width: '200px', height: '200px', borderRadius: '50%' }}
          />
        </div>

        <div style={{
          flex: 1,
          border: '1px solid #ccc',
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: '#fdfdfd',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <h2>
            {docInfo.name}{' '}
            <img src={verified_icon} alt="Verified" style={{ width: '20px', verticalAlign: 'middle' }} />
          </h2>

          <p>{docInfo.degree} - {docInfo.speciality}</p>
          <button style={{
            padding: '6px 12px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
          }}>
            {docInfo.experience}
          </button>

          <h3>About <img src={info_icon} alt="info" style={{ width: '18px' }} /></h3>
          <p>{docInfo.about}</p>

          <p style={{ marginTop: '16px', fontWeight: '500' }}>
            Appointment Fee: <span style={{ color: '#007BFF' }}>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <div style={{ marginTop: '40px' }}>
        <h3>Booking Slots</h3>

        {/* Date Picker */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {docSlots.map((daySlots, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime('');
              }}
              style={{
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: slotIndex === index ? '#80bfff' : '#cce0ff',
                width: '100px',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <p>{daySlots[0] && dayOfWeeks[daySlots[0].datetime.getDay()]}</p>
              <p>{daySlots[0] && daySlots[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Picker */}
        <div style={{
          marginTop: '24px',
          display: 'flex',
          overflowX: 'auto',
          gap: '14px',
        }}>
          {docSlots[slotIndex]?.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              style={{
                padding: '10px 16px',
                minWidth: '90px',
                backgroundColor: slotTime === slot.time ? '#80bfff' : '#cce0ff',
                borderRadius: '20px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {slot.time.toLowerCase()}
            </div>
          ))}
        </div>

        {/* Book Button */}
        {slotTime && (
          <div style={{ marginTop: '30px' }}>
            <button
              onClick={bookAppointment}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>

      {/* Related Doctors */}
      {docInfo?.speciality && (
        <RelatedDocters docId={docId} speciality={docInfo.speciality} />
      )}
    </div>
  );
};

export default Appointment;
