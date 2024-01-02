import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectOnRefresh = () => {
  const navigate = useNavigate();

  // 조건에 따라 특정 페이지로 리다이렉트
  const redirectTo = (condition, path) => {
    useEffect(() => {
      if (condition) {
        navigate(path);
      }
    }, [navigate, condition, path]);
  };

  // 새로고침을 감지하고 이전 페이지로 리다이렉트
  const redirectOnRefresh = () => {
    useEffect(() => {
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
    }, [navigate]);
  };

  return { redirectTo, redirectOnRefresh };
};

export default useRedirectOnRefresh;