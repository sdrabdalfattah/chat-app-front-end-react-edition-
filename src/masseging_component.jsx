useEffect(() => {
  if (!window.visualViewport) return;

  let timeout;

  const viewportHandler = () => {
    clearTimeout(timeout);

    const offsetTop = window.visualViewport.offsetTop;
    const heightDiff = window.innerHeight - window.visualViewport.height - offsetTop;

    if (bottomBarRef.current) {
      bottomBarRef.current.style.transform = `translateY(-${Math.max(0, heightDiff)}px)`;
    }

    if (topBarRef.current) {
      topBarRef.current.style.transform = `translateY(${Math.max(0, offsetTop)}px)`;
    }

    // إعادة التحديث بعد قليل لتفادي الأخطاء عند تمدد الكيبورد
    timeout = setTimeout(viewportHandler, 150);
  };

  window.visualViewport.addEventListener("scroll", viewportHandler);
  window.visualViewport.addEventListener("resize", viewportHandler);

  return () => {
    window.visualViewport.removeEventListener("scroll", viewportHandler);
    window.visualViewport.removeEventListener("resize", viewportHandler);
    clearTimeout(timeout);
  };
}, []);

