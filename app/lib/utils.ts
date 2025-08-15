import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToDonationForm() {
  const donationForm = document.getElementById('donation-form')
  if (donationForm) {
    donationForm.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export function scrollToOrganizationActivities() {
  const organizationActivities = document.getElementById('organization-activities')
  if (organizationActivities) {
    organizationActivities.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export function scrollToPhotosVideos() {
  const photosVideos = document.getElementById('photos-videos')
  if (photosVideos) {
    photosVideos.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export function scrollToFamilyTestimonials() {
  const familyTestimonials = document.getElementById('family-testimonials')
  if (familyTestimonials) {
    familyTestimonials.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export function scrollToOrganizationPurpose() {
  const organizationPurpose = document.getElementById('organization-purpose')
  if (organizationPurpose) {
    organizationPurpose.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

export const SlidUp = (delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2, 
        ease: "easeInOut",
        delay: delay,
      },
    },
  };
};

export const SlidUpLeft = (delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2, 
        ease: "easeInOut",
        delay: delay,
      },
    },
  };
};

export const SlidUpRight = (delay: number = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 2, 
        ease: "easeInOut", 
        delay: delay,
      },
    },
  };
}; 