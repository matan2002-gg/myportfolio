function showTab(id, button) {
  const experienceTab = document.getElementById('experienceTab');
  const educationTab = document.getElementById('educationTab');
  const experience = document.getElementById('experience');
  const education = document.getElementById('education');
  const showExperience = id === 'experience';

  experience.classList.toggle('hidden', !showExperience);
  education.classList.toggle('hidden', showExperience);
  experience.setAttribute('aria-hidden', String(!showExperience));
  education.setAttribute('aria-hidden', String(showExperience));
  experienceTab.setAttribute('aria-selected', String(showExperience));
  educationTab.setAttribute('aria-selected', String(!showExperience));
  button.focus();
}

document.querySelectorAll('img').forEach(image => {
  image.hidden = true;
  if (image.complete) {
    image.hidden = image.naturalWidth === 0;
  } else {
    image.addEventListener('load', () => {
      image.hidden = false;
    }, { once: true });
  }
});

const photoBreak = document.querySelector('.photo-break');

if (photoBreak && 'IntersectionObserver' in window) {
  photoBreak.classList.add('scroll-photo-ready');
  const photoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      photoBreak.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.3 });

  photoObserver.observe(photoBreak);
}

const revealPhotos = document.querySelectorAll('.reveal-on-scroll');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });

  revealPhotos.forEach(photo => {
    photo.classList.add('reveal-ready');
    revealObserver.observe(photo);
  });
}

const readingProgress = document.querySelector('.reading-progress span');
let progressFrame = 0;

function updateReadingProgress() {
  progressFrame = 0;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  if (readingProgress) {
    readingProgress.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`;
  }
}

function scheduleProgressUpdate() {
  if (!progressFrame) {
    progressFrame = window.requestAnimationFrame(updateReadingProgress);
  }
}

window.addEventListener('scroll', scheduleProgressUpdate, { passive: true });
window.addEventListener('resize', scheduleProgressUpdate);
updateReadingProgress();
