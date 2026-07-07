import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useFadeInUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 60 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return ref;
}

export function useFadeInLeft(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: -60 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return ref;
}

export function useFadeInRight(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, x: 40 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 1,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return ref;
}

export function useStaggerChildren(staggerDelay = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;
    gsap.set(children, { opacity: 0, y: 50 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: staggerDelay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [staggerDelay]);

  return ref;
}

export function useScaleIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, scale: 0.95 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay,
          ease: 'power3.out',
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return ref;
}
