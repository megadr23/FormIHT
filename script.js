document.addEventListener('DOMContentLoaded', function () {
  const namaDropdown = $('#nama');
  const unitField = $('#unit');
  const judulDropdown = $('#judulIHT');
  const tanggalInput = $('#tanggal');
  const submitButton = $('#submit-btn');
  const signaturePad = document.getElementById('signature-pad');
  const clearButton = $('#clear-signature');
  const notification = $('#notification');
  const closeNotification = $('#close-notification');

  // Sample data
  const namaList = [
    { id: '1', text: 'Dr. Muhammad Rasyid', unit: 'Dokter Spesialis' },
    { id: '2', text: 'Siti Khadijah, M.Kep', unit: 'Kepala Perawat' },
    { id: '3', text: 'Ahmad Fauzi, S.Kep', unit: 'Perawat' },
    { id: '4', text: 'Nur Aisyah, M.Farm', unit: 'Apoteker' },
  ];

  const ihtList = [
    { id: '101', text: 'Manajemen Risiko Klinik' },
    { id: '102', text: 'Teknik Resusitasi Neonatus' },
    { id: '103', text: 'Keamanan Pasien' },
  ];

  // Inisialisasi Select2
  namaDropdown.select2({ placeholder: '-- Pilih Nama --', data: namaList, width: '100%' });
  judulDropdown.select2({ placeholder: '-- Pilih Judul IHT --', data: ihtList, width: '100%' });

  // Set Unit/Jabatan berdasarkan Nama, tetap bisa diedit
  namaDropdown.on('change', function () {
    let selectedPerson = namaList.find((p) => p.id === this.value);
    unitField.val(selectedPerson ? selectedPerson.unit : '').prop('readonly', false);
    checkFormValidity();
  });

  unitField.on('input', checkFormValidity);

  // Canvas untuk tanda tangan
  let ctx = signaturePad.getContext('2d');
  let drawing = false;

  signaturePad.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
  });
  signaturePad.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
    checkFormValidity();
  });
  signaturePad.addEventListener('mousemove', (e) => {
    if (drawing) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });

  clearButton.on('click', function () {
    ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
    ctx.beginPath();
    checkFormValidity();
  });

  function checkFormValidity() {
    let isSignatureFilled = signaturePad.toDataURL().length > 500;
    let allFilled = namaDropdown.val() && judulDropdown.val() && tanggalInput.val() && unitField.val().trim() !== '' && isSignatureFilled;
    submitButton.prop('disabled', !allFilled);
  }

  submitButton.on('click', function (e) {
    e.preventDefault();
    notification.fadeIn();
    document.getElementById('attendance-form').reset();
  });

  closeNotification.on('click', function () {
    notification.fadeOut();
  });
});
