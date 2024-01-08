import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useRedirectOnRefresh = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const reload = () => {
    navigate(location.pathname);
  };

  // useEffect(() => {
  //   reload();
  // }, [navigate, location]);

  // 조건에 따라 특정 페이지로 리다이렉트
  const redirectTo = (condition, path) => {
    if (condition) {
      navigate(path);
    }
  };

  // useEffect(() => {
  //   redirectTo();
  // }, [navigate]);

  // 새로고침을 감지하고 이전 페이지로 리다이렉트
  const redirectOnRefresh = () => {
    const handlePageLoad = () => {
      if (sessionStorage.getItem("isReloaded")) {
        navigate(-1); // 이전 페이지로 이동
      } else {
        sessionStorage.setItem("isReloaded", true);
      }
    };

    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
      sessionStorage.removeItem("isReloaded");
    };
  };

  // useEffect(() => {
  //   redirectOnRefresh();
  // }, [navigate]);

  return { reload, redirectTo, redirectOnRefresh };
};

export default useRedirectOnRefresh;