export class FadingVideo {
    constructor(videoElement) {
        this.video = videoElement;
        this.fadeMs = 500;
        this.fadeOutLead = 0.55;
        this.fadingOut = false;
        this.rafId = null;

        this.init();
    }

    fadeTo(targetOpacity, duration) {
        if (this.rafId) cancelAnimationFrame(this.rafId);

        const startOpacity = parseFloat(this.video.style.opacity) || 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;

            this.video.style.opacity = currentOpacity;

            if (progress < 1) {
                this.rafId = requestAnimationFrame(animate);
            }
        };

        this.rafId = requestAnimationFrame(animate);
    }

    init() {
        this.video.addEventListener('loadeddata', () => {
            this.video.style.opacity = 0;
            this.video.play().catch(() => {});
            this.fadeTo(1, this.fadeMs);
        });

        this.video.addEventListener('timeupdate', () => {
            if (!this.fadingOut && this.video.duration - this.video.currentTime <= this.fadeOutLead && this.video.duration > 0) {
                this.fadingOut = true;
                this.fadeTo(0, this.fadeMs);
            }
        });

        this.video.addEventListener('ended', () => {
            this.video.style.opacity = 0;
            setTimeout(() => {
                this.video.currentTime = 0;
                this.video.play().catch(() => {});
                this.fadingOut = false;
                this.fadeTo(1, this.fadeMs);
            }, 100);
        });
    }
}

export function initBlurAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.blur-text').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        el.style.display = 'flex';
        el.style.flexWrap = 'wrap';
        el.style.justifyContent = 'center';

        text.split(' ').forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = 'word';
            span.style.transitionDelay = `${i * 100}ms`;
            span.style.marginRight = '0.28em';
            el.appendChild(span);
        });

        observer.observe(el);
    });
}
