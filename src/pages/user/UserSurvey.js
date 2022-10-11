import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Consent from '../../components/UsersQuestions/Consent';
import ImageShow from '../../components/UsersQuestions/ImageShow';
import LongDes from '../../components/UsersQuestions/LongDes';
import MultipleM from '../../components/UsersQuestions/MultipleM';
import MultipleS from '../../components/UsersQuestions/MultipleS';
import Phone from '../../components/UsersQuestions/Phone';
import ShortDes from '../../components/UsersQuestions/ShortDes';
import { API } from '../../config';
import styled from 'styled-components';

const UserSurvey = ({ form, userId }) => {
  const methods = useForm();

  const onSubmit = data => {
    fetch(`${API.OPINION}/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(result => {
        if (result.message === 'success') {
          window.location.href = form.etc.url;
        } else if (result.message === 'already_exist_phone_number') {
          alert('이미 제출한 설문지입니다. 감사합니다');
        } else {
        }
      });
  };

  return (
    <FormProvider {...methods}>
      <SurveyForm onSubmit={methods.handleSubmit(onSubmit)}>
        {form?.formData?.map((el, idx) => (
          <div key={idx}>
            {
              QUESTION_ARRAY(idx + 1, el.question, el.option, userId)[
                Number(el.type)
              ]
            }
          </div>
        ))}
        <Button type="submit">완료</Button>
      </SurveyForm>
    </FormProvider>
  );
};

export default UserSurvey;

const SurveyForm = styled.form``;

const Button = styled.button`
  display: block;
  margin-left: 85%;
  margin-bottom: 30px;
  padding: ${children =>
    children.children === '이전으로 가기' || '다음으로 가기' ? '5Px 20px' : 0};
  color: #ffffff;
  border-color: ${props => props.theme.style.mainBlue};
  background-color: ${props => props.theme.style.mainBlue};
  border-radius: 5.5px;
  height: 50px;
  position: ${children => children.children === '...' && 'absolute'};
  opacity: 0.86;

  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const QUESTION_ARRAY = (sortIndex, ...args) => {
  return {
    1: (
      <MultipleS
        sortIndex={sortIndex}
        label="multipleSingle"
        question={args[0]}
        option={args[1]}
      />
    ),
    2: (
      <MultipleM
        sortIndex={sortIndex}
        label="multipleMultiple"
        question={args[0]}
        option={args[1]}
      />
    ),
    3: (
      <ShortDes
        sortIndex={sortIndex}
        label="shortDescription"
        question={args[0]}
      />
    ),
    4: (
      <LongDes
        sortIndex={sortIndex}
        label="longDescription"
        question={args[0]}
      />
    ),
    5: <ImageShow sortIndex={sortIndex} userId={args[2]} question={args[0]} />,
    6: (
      <Phone sortIndex={sortIndex} label="multipleSingle" question={args[0]} />
    ),
    7: (
      <Consent
        sortIndex={sortIndex}
        label="multipleSingle"
        question={args[0]}
      />
    ),
  };
};