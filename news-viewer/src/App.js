import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

// Category의 상태를 useState로 관리 하도록 코드 바꿈.
// React Router Dom 을 사용했기 때문에 Route path만 간단하게 입력 함.
const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;
