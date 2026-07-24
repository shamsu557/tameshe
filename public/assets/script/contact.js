/* =========================================================
   TAMESHE GLOBAL NIGERIA — CONTACT FORM VALIDATION
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  const successBox = form.querySelector('.form-success');

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    phone: (v) => v.trim() === '' || /^[0-9+\s-]{7,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
    subject: (v) => v.trim().length >= 3 || 'Please enter a subject.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const group = field.closest('.form-group');
    if (result === true) {
      group.classList.remove('has-error');
      return true;
    }
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  form.querySelectorAll('.form-control').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    form.querySelectorAll('.form-control').forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (isValid) {
      successBox.classList.add('is-visible');
      form.reset();
      setTimeout(() => successBox.classList.remove('is-visible'), 6000);
    } else {
      const firstError = form.querySelector('.has-error .form-control');
      if (firstError) firstError.focus();
    }
  });
});
