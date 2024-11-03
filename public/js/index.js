document.addEventListener('DOMContentLoaded', () => {
  // Format date to locale
  const dateEl = document.querySelectorAll('._date');
  dateEl.forEach(el => {
    const localDate = new Date(el.innerText);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    el.innerText = localDate.toLocaleString(undefined, options);
  });

  // Enable tooltip
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  const tooltipList = [...tooltipTriggerList].map(
    tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl),
  );
});
