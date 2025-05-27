export const scrollToSection = (targetId: string) => {
  const section = document.getElementById(targetId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

export const scrollToTop = (containerId?: string, offset: number = 0) => {
  if (containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.scrollTo({ 
        top: offset, 
        behavior: "smooth" 
      });
    }
  } else {
    window.scrollTo({ 
      top: offset, 
      behavior: "smooth" 
    });
  }
};