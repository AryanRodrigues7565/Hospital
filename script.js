const doctors = [
  { id: 1, name: 'Dr. Aisha Mehta', specialty: 'Cardiology', initials: 'AM' },
  { id: 2, name: 'Dr. Rohan Sharma', specialty: 'Neurology', initials: 'RS' },
  { id: 3, name: 'Dr. Sneha Kapoor', specialty: 'Pediatrics', initials: 'SK' },
  { id: 4, name: 'Dr. Arjun Nair', specialty: 'Orthopedics', initials: 'AN' }
];

const patients = [
  { id: 1, name: 'Priya Nair', age: 29, condition: 'Migraine', doctor: 'Dr. Rohan Sharma', status: 'Stable' },
  { id: 2, name: 'Vikram Singh', age: 52, condition: 'Cardiac Review', doctor: 'Dr. Aisha Mehta', status: 'Critical' },
  { id: 3, name: 'Ishita Rao', age: 11, condition: 'Fever', doctor: 'Dr. Sneha Kapoor', status: 'Observation' },
  { id: 4, name: 'Aniket Patel', age: 41, condition: 'Knee Injury', doctor: 'Dr. Arjun Nair', status: 'Recovery' },
  { id: 5, name: 'Meera Iyer', age: 36, condition: 'Diabetes Check', doctor: 'Dr. Aisha Mehta', status: 'Stable' }
];

const appointments = [
  { patient: 'Priya Nair', time: '09:30 AM', doctor: 'Dr. Rohan Sharma', type: 'Consultation', date: '15 Oct 2026' },
  { patient: 'Vikram Singh', time: '11:00 AM', doctor: 'Dr. Aisha Mehta', type: 'Follow-up', date: '16 Oct 2026' },
  { patient: 'Ishita Rao', time: '01:15 PM', doctor: 'Dr. Sneha Kapoor', type: 'Vaccination', date: '17 Oct 2026' },
  { patient: 'Aniket Patel', time: '03:45 PM', doctor: 'Dr. Arjun Nair', type: 'Physio', date: '18 Oct 2026' }
];

const billing = [
  {
    name: 'Priya Nair',
    amount: 4800,
    due: 'Paid',
    invoiceNo: 'INV-2026-1001',
    date: '04 Oct 2026',
    services: ['Consultation', 'Lab Tests', 'Prescription']
  },
  {
    name: 'Vikram Singh',
    amount: 7600,
    due: 'Pending',
    invoiceNo: 'INV-2026-1002',
    date: '04 Oct 2026',
    services: ['Cardiac Review', 'Medication', 'Follow-up']
  },
  {
    name: 'Ishita Rao',
    amount: 2100,
    due: 'Paid',
    invoiceNo: 'INV-2026-1003',
    date: '04 Oct 2026',
    services: ['Pediatric Checkup', 'Vaccination']
  },
  {
    name: 'Aniket Patel',
    amount: 6100,
    due: 'Pending',
    invoiceNo: 'INV-2026-1004',
    date: '04 Oct 2026',
    services: ['Orthopedic Consultation', 'Physiotherapy']
  }
];

const records = [
  { patient: 'Priya Nair', diagnosis: 'Migraine', prescription: 'Paracetamol 500mg, rest advised', doctor: 'Dr. Rohan Sharma' },
  { patient: 'Vikram Singh', diagnosis: 'Heart check-up', prescription: 'ECG review, low sodium diet', doctor: 'Dr. Aisha Mehta' },
  { patient: 'Ishita Rao', diagnosis: 'Viral fever', prescription: 'Hydration and fever syrup', doctor: 'Dr. Sneha Kapoor' }
];

const labResults = [
  { patient: 'Priya Nair', test: 'CBC', result: 'Normal', status: 'Low' },
  { patient: 'Vikram Singh', test: 'ECG', result: 'Requires review', status: 'High' },
  { patient: 'Ishita Rao', test: 'Blood Culture', result: 'Pending', status: 'Medium' }
];

const notifications = [
  { title: 'Appointment Confirmed', detail: 'Your consultation with Dr. Rohan Sharma is booked for tomorrow at 9:30 AM.' },
  { title: 'Lab Results Ready', detail: 'CBC report for Priya Nair is available.' },
  { title: 'Prescription Updated', detail: 'Your patient prescription has been added to records.' }
];

const doctorGrid = document.querySelector('#doctorGrid');
const appointmentList = document.querySelector('#appointmentList');
const recordsList = document.querySelector('#recordsList');
const billingList = document.querySelector('#billingList');
const labList = document.querySelector('#labList');
const notificationList = document.querySelector('#notificationList');
const appointmentCountChip = document.querySelector('#appointmentCountChip');
const bookingStatus = document.querySelector('#bookingStatus');
const appointmentForm = document.querySelector('#appointmentForm');
const patientSearch = document.querySelector('#patientSearch');
const searchBtn = document.querySelector('#searchBtn');
const homePatientsCount = document.querySelector('#homePatientsCount');
const homeDoctorsCount = document.querySelector('#homeDoctorsCount');
const adminPatientsCount = document.querySelector('#adminPatientsCount');
const adminDoctorsCount = document.querySelector('#adminDoctorsCount');
const adminAppointmentsCount = document.querySelector('#adminAppointmentsCount');
const adminPatientForm = document.querySelector('#adminPatientForm');
const adminDoctorForm = document.querySelector('#adminDoctorForm');
const adminPatientsList = document.querySelector('#adminPatientsList');
const adminDoctorsList = document.querySelector('#adminDoctorsList');
const appointmentDoctorSelect = document.querySelector('select[name="appointmentDoctor"]');
const adminPatientDoctorSelect = document.querySelector('#adminPatientDoctor');

function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function renderDoctors(filterText = '') {
  const query = filterText.trim().toLowerCase();
  const filteredDoctors = doctors.filter((doctor) => {
    if (!query) return true;
    return doctor.name.toLowerCase().includes(query) || doctor.specialty.toLowerCase().includes(query);
  });

  if (doctorGrid) {
    if (!filteredDoctors.length) {
      doctorGrid.innerHTML = '<div class="empty-state">No doctors found for this search.</div>';
      return;
    }

    doctorGrid.innerHTML = filteredDoctors.map((doctor) => `
      <div class="doctor-card">
        <div class="doctor-avatar">${doctor.initials}</div>
        <h4>${doctor.name}</h4>
        <p>${doctor.specialty}</p>
        <span class="chip success">Available</span>
      </div>
    `).join('');
  }
}

function renderAppointments(filterText = '') {
  const query = filterText.trim().toLowerCase();
  const filteredAppointments = appointments.filter((item) => {
    if (!query) return true;
    return item.patient.toLowerCase().includes(query) || item.doctor.toLowerCase().includes(query) || item.type.toLowerCase().includes(query);
  });

  if (appointmentList) {
    if (!filteredAppointments.length) {
      appointmentList.innerHTML = '<div class="empty-state">No appointments match your search.</div>';
    } else {
      appointmentList.innerHTML = filteredAppointments.map((appointment) => `
        <div class="appointment-item">
          <div>
            <strong>${appointment.patient}</strong>
            <small>${appointment.type} • ${appointment.doctor}</small>
          </div>
          <div style="text-align:right;">
            <strong>${appointment.time}</strong>
            <small>${appointment.date}</small>
          </div>
        </div>
      `).join('');
    }
  }

  if (appointmentCountChip) {
    appointmentCountChip.textContent = filteredAppointments.length;
  }
}

function renderRecords() {
  if (recordsList) {
    recordsList.innerHTML = records.map((record) => `
      <div class="list-item">
        <div class="meta">
          <strong>${record.patient}</strong>
          <small>${record.doctor}</small>
        </div>
        <div style="text-align:right;">
          <strong>${record.diagnosis}</strong>
          <small>${record.prescription}</small>
        </div>
      </div>
    `).join('');
  }
}

function renderBilling() {
  if (billingList) {
    billingList.innerHTML = billing.map((item) => `
      <div class="bill-item">
        <div class="billing-item-main">
          <strong>${item.name}</strong>
          <small>${item.due === 'Paid' ? 'Payment Received' : 'Awaiting Payment'}</small>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="amount">${formatINR(item.amount)}</div>
          <button class="primary-button bill-download-btn" type="button" data-patient="${item.name}">
            Download Bill
          </button>
        </div>
      </div>
    `).join('');

    document.querySelectorAll('.bill-download-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const patientName = button.getAttribute('data-patient');
        if (patientName) downloadBillPdf(patientName);
      });
    });
  }
}

function renderLabReports() {
  if (labList) {
    labList.innerHTML = labResults.map((item) => `
      <div class="list-item">
        <div class="meta">
          <strong>${item.patient}</strong>
          <small>${item.test}</small>
        </div>
        <div style="text-align:right;">
          <strong>${item.result}</strong>
          <span class="tag ${item.status.toLowerCase()}">${item.status}</span>
        </div>
      </div>
    `).join('');
  }
}

function renderNotifications() {
  if (notificationList) {
    notificationList.innerHTML = notifications.map((item) => `
      <div class="list-item">
        <div class="meta">
          <strong>${item.title}</strong>
          <small>${item.detail}</small>
        </div>
        <span class="tag low">New</span>
      </div>
    `).join('');
  }
}

function renderAdminStats() {
  if (homePatientsCount) homePatientsCount.textContent = patients.length;
  if (homeDoctorsCount) homeDoctorsCount.textContent = doctors.length;
  if (adminPatientsCount) adminPatientsCount.textContent = patients.length;
  if (adminDoctorsCount) adminDoctorsCount.textContent = doctors.length;
  if (adminAppointmentsCount) adminAppointmentsCount.textContent = appointments.length;
}

function renderAdminLists() {
  if (adminPatientsList) {
    adminPatientsList.innerHTML = patients.map((patient) => `
      <div class="appointment-item">
        <div>
          <strong>${patient.name}</strong>
          <small>${patient.condition} • ${patient.doctor}</small>
        </div>
        <div style="text-align:right;">
          <strong>${patient.status}</strong>
          <small>${patient.age} yrs</small>
        </div>
      </div>
    `).join('');
  }

  if (adminDoctorsList) {
    adminDoctorsList.innerHTML = doctors.map((doctor) => `
      <div class="appointment-item">
        <div>
          <strong>${doctor.name}</strong>
          <small>${doctor.specialty}</small>
        </div>
        <div style="text-align:right;">
          <strong>Available</strong>
          <small>Consultation</small>
        </div>
      </div>
    `).join('');
  }
}

function downloadBillPdf(patientName) {
  const selectedBill = billing.find((item) => item.name === patientName) || billing[0];

  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.print();
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const subtotal = selectedBill.amount;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  const serviceRows = selectedBill.services.map((service, index) => {
    const perServiceAmount = Math.round(subtotal / selectedBill.services.length);
    const amount = index === selectedBill.services.length - 1
      ? subtotal - (perServiceAmount * (selectedBill.services.length - 1))
      : perServiceAmount;
    return { service, amount };
  });

  doc.setFillColor(14, 92, 160);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('CareNest Hospital', 14, 18);
  doc.setFontSize(10);
  doc.text('Hospital Management System', 14, 25);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.text('Hospital Bill', 14, 42);
  doc.setFontSize(10);
  doc.text(`Patient: ${selectedBill.name}`, 14, 52);
  doc.text(`Invoice No: ${selectedBill.invoiceNo}`, 14, 58);
  doc.text(`Date: ${selectedBill.date}`, 14, 64);
  doc.text(`Status: ${selectedBill.due}`, 14, 70);

  let y = 84;
  doc.setFontSize(11);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y - 4, 196, y - 4);
  doc.text('Service', 14, y);
  doc.text('Amount', 170, y);
  y += 10;

  serviceRows.forEach((row) => {
    const wrappedText = doc.splitTextToSize(row.service, 88);
    wrappedText.forEach((line) => {
      doc.text(line, 14, y);
      y += 6;
    });
    doc.text('₹' + row.amount.toLocaleString('en-IN'), 170, y - (wrappedText.length > 1 ? 6 : 0));
    y += 8;
  });

  doc.line(14, y + 2, 196, y + 2);
  doc.text('Subtotal', 130, y + 12);
  doc.text('₹' + subtotal.toLocaleString('en-IN'), 170, y + 12);
  doc.text('GST (5%)', 130, y + 20);
  doc.text('₹' + tax.toLocaleString('en-IN'), 170, y + 20);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Total', 130, y + 32);
  doc.text('₹' + total.toLocaleString('en-IN'), 170, y + 32);

  doc.save(`CareNest-Bill-${selectedBill.name.replace(/\s+/g, '-')}.pdf`);
}

function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach((section) => {
    section.classList.toggle('hidden-section', section.id !== sectionId);
  });

  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.getAttribute('data-target') === sectionId);
  });
}

function initializeDoctorSelects() {
  const doctorOptions = doctors.map((doctor) => `
    <option value="${doctor.name}">${doctor.name}</option>
  `).join('');

  if (appointmentDoctorSelect) {
    appointmentDoctorSelect.innerHTML = '<option value="">Select doctor</option>' + doctorOptions;
  }

  if (adminPatientDoctorSelect) {
    adminPatientDoctorSelect.innerHTML = '<option value="">Select doctor</option>' + doctorOptions;
  }
}

function addPatient(event) {
  event.preventDefault();

  const name = document.querySelector('#adminPatientName').value.trim();
  const age = document.querySelector('#adminPatientAge').value.trim();
  const condition = document.querySelector('#adminPatientCondition').value.trim();
  const doctor = document.querySelector('#adminPatientDoctor').value;
  const status = document.querySelector('#adminPatientStatus').value;

  if (!name || !age || !condition || !doctor || !status) return;

  patients.unshift({
    id: patients.length + 1,
    name,
    age: Number(age),
    condition,
    doctor,
    status
  });

  records.unshift({
    patient: name,
    diagnosis: condition,
    prescription: 'Initial consult scheduled',
    doctor
  });

  renderAdminStats();
  renderRecords();
  renderAdminLists();
  if (adminPatientForm) adminPatientForm.reset();
  if (showSection) showSection('records');
}

function addAppointment(event) {
  event.preventDefault();
  const formData = new FormData(appointmentForm);
  const patientName = formData.get('appointmentPatient').toString().trim();
  const doctorName = formData.get('appointmentDoctor').toString();
  const appointmentDate = formData.get('appointmentDate').toString();
  const appointmentTime = formData.get('appointmentTime').toString();
  const reason = formData.get('appointmentReason').toString().trim();

  if (!patientName || !doctorName || !appointmentDate || !appointmentTime || !reason) {
    if (bookingStatus) {
      bookingStatus.textContent = 'Please complete all booking details.';
      bookingStatus.className = 'booking-status error';
    }
    return;
  }

  const formattedDate = new Date(`${appointmentDate}T${appointmentTime}`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  appointments.unshift({
    patient: patientName,
    time: new Date(`2000-01-01T${appointmentTime}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    doctor: doctorName,
    type: reason,
    date: formattedDate
  });

  if (bookingStatus) {
    bookingStatus.textContent = `Appointment booked for ${patientName} on ${formattedDate}.`;
    bookingStatus.className = 'booking-status success';
  }
  if (appointmentForm) appointmentForm.reset();
  renderAppointments();
  renderAdminStats();
}

function addDoctor(event) {
  event.preventDefault();
  const name = document.querySelector('#adminDoctorName').value.trim();
  const specialty = document.querySelector('#adminDoctorSpecialty').value.trim();
  const availability = document.querySelector('#adminDoctorDays').value.trim();

  if (!name || !specialty || !availability) return;

  doctors.push({
    id: doctors.length + 1,
    name,
    specialty,
    initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  });

  initializeDoctorSelects();
  renderDoctors();
  renderAdminStats();
  renderAdminLists();
  if (adminDoctorForm) adminDoctorForm.reset();
}

function applySearch(query) {
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    renderDoctors();
    renderAppointments();
    showSection('home');
    return;
  }

  const matchedDoctors = doctors.some((doctor) =>
    doctor.name.toLowerCase().includes(cleanQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(cleanQuery.toLowerCase())
  );

  const matchedAppointments = appointments.some((appointment) =>
    appointment.patient.toLowerCase().includes(cleanQuery.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(cleanQuery.toLowerCase()) ||
    appointment.type.toLowerCase().includes(cleanQuery.toLowerCase())
  );

  if (matchedDoctors || matchedAppointments) {
    if (matchedDoctors && !matchedAppointments) {
      showSection('doctors');
    } else if (matchedAppointments && !matchedDoctors) {
      showSection('appointments');
    } else {
      showSection('doctors');
    }
  } else {
    showSection('doctors');
  }

  renderDoctors(cleanQuery);
  renderAppointments(cleanQuery);
}

if (patientSearch) {
  patientSearch.addEventListener('input', (event) => {
    applySearch(event.target.value);
  });

  patientSearch.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      applySearch(event.target.value);
    }
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    applySearch(patientSearch ? patientSearch.value : '');
  });
}

if (appointmentForm) appointmentForm.addEventListener('submit', addAppointment);
if (adminPatientForm) adminPatientForm.addEventListener('submit', addPatient);
if (adminDoctorForm) adminDoctorForm.addEventListener('submit', addDoctor);

if (document.getElementById('quickAddBtn')) {
  document.getElementById('quickAddBtn').addEventListener('click', () => {
    showSection('admin');
    setTimeout(() => {
      const patientNameInput = document.querySelector('#adminPatientName');
      if (patientNameInput) patientNameInput.focus();
    }, 100);
  });
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const sectionId = button.getAttribute('data-target');
    if (sectionId) showSection(sectionId);
  });
});

initializeDoctorSelects();
showSection('home');
renderDoctors();
renderAppointments();
renderRecords();
renderBilling();
renderLabReports();
renderNotifications();
renderAdminStats();
renderAdminLists();
