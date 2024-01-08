import { useRef, useState } from 'react';

const useFormSubmitValidation = ( validationRules ) => {
  const [errors, setErrors] = useState({});
  const [validatedState, setValidatedState] = useState(false);
  const elements = {};

  // 각 입력 필드에 대한 ref를 생성
  for (const field in validationRules) {
    elements[field] = useRef();
  }

  const validate = () => {
    let isValid = true;
    const newErrors = {};
    let firstErrorMessage = ''; // 첫 번째 오류 메시지를 저장할 변수
  
    for (const field in validationRules) {
      const value = elements[field].current.value;
      const rules = validationRules[field];
      for (const rule of rules) {
        if (!rule.validate(value)) {
          newErrors[field] = rule.message;
          if (!firstErrorMessage) {
            firstErrorMessage = rule.message; // 첫 번째 오류 메시지 저장
          }
          isValid = false;
          break;
        }
      }
    }
  
    setErrors(newErrors);
    return { isValid, firstErrorMessage };
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { isValid, firstErrorMessage } = validate();
    
    if (isValid) {
      // console.log('😎');
      setValidatedState(isValid);
    } else {
      alert(firstErrorMessage);
    }
  };

  return { elements, validatedState, errors, handleSubmit };
};

export default useFormSubmitValidation;

// 사용
// const { elements, validatedState, handleSubmit } = useFormSubmitValidation(validationRules);

// parameter 형태
// const validationRules = {
//   username: [
//     { validate: (value) => value.length !== 0, message: '이름을 입력해주세요.' }
//   ],
//   simple_password: [
//     { validate: (value) => value.length !== 0, message: '패스워드를 입력해주세요.' }
//   ],
//   title: [
//     { validate: (value) => value.length !== 0, message: '제목을 입력해주세요.' }
//   ],
//   comment: [
//     { validate: (value) => value.length !== 0, message: '내용이 비어있습니다.' }
//   ]
// };