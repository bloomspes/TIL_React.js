주니어 개발자의 웹 프론트엔드 개발 공부 기록.

자료구조, 알고리즘, OOP... 공부하다 보니 이제 레퍼런스를 보고 라이브러리 구조를 어느 정도 파악할 수준까지는 온 것 같다고 생각했다. 그러나 로직을 구현할 수 있는 클라이언트는 손도 못 댄다는 것이 함정이었다. 누군가 웹 애플리케이션을 같이 개발하자고 하면 뜸을 들일 수밖에 없던 이유도 그러했다. 깃허브 블로그를 만들기를 꺼렸던 이유도 바로 그 이유에서였다. 나는 JSX를 건들지 못할뿐더러 소스 코드를 리팩토링할 줄 모른다.

그래서, 공부하기로 결심했다.

## 1. 웹 프레임워크를 사용하여 개발하는 경우 필요한 개념들

- javascript 기반의 인터페이스 라이브러리 (Angular.js React.js Vue.js)
- Babel
- Webpack
- Plugin / Preset
- HTML DOM
- CSS
- UX에 대한 최소한의 가이드 필요 ex) 구글의 material design
- EcmaScript
- template 관점에서의 설계
- component
- npm, yarn 과 같은 package 매니저 사용법

*... 등과 같이 무수히 많지만 필수 라고 생각하는 개념들을 요약해서 적어 놓았다.*

## 1.1 인터페이스 라이브러리 고르기

나는 웹 프론트엔드 개발에 쓰일 라이브러리로, 3가지의 요건을 충족하는 라이브러리로 React.js를 골랐다.

그 요건은 아래와 같았다.

1. 이식성이 좋은 라이브러리 이어야 한다.
2. 자바스크립트에 대한 높은 이해도를 초반부터 요구하지 않는다.
3. Virtual DOM을 사용한다.

이왕이면, 자바스크립트의 문법을 익히는 것과 함께 React 라이브러리에 익숙해 지기로 마음을 먹었다. 

트위터나 페이스북의 경우, 10분만 피드를 스크롤 하면 페이지 렌더링의 결과물로 DOM 트리에서 읽어오는 10만개 이상의 노드가 존재한다고 한다. 

**가상 돔(Virtual DOM)**은 실시간으로 업데이트 되는 항목에 대해 불필요한 렌더링 횟수를 줄이기 위해 

변경 사항이 모두 반영된 돔 트리를 인스턴스와 렌더 트리 중간에 삽입 된다. 그리하여, 브라우저가 최종적으로 한번만 렌더링을 실행 하게 되면서 데이터 로딩 시 발생하는 병목 현상을 줄일 수 있다.

## 1.2 Babel + Webpack 은 함께!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03c430b9-6f5d-4de1-8930-7f479d9031f2/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/03c430b9-6f5d-4de1-8930-7f479d9031f2/Untitled.png)

- Babel : 바벨은 EcmaScript 컴파일러이다. 최신 자바스크립트 문법을 ES버전에 맞춰 코드를 변환한다.
- Webpack : 자바스크립트의 module bundler 이다. 자바스크립트 모듈은 서로 의존성을 가지고 있는데 
이 의존성을 가진 모듈 들을 정적으로 고정 시켜서 bundle을 만든다고 보면 된다. 이해를 돕기 위해 사진을 첨부 했다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8dd4b65a-c090-4206-bff9-b221506b6b7f/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8dd4b65a-c090-4206-bff9-b221506b6b7f/Untitled.png)

*(출처: https://velog.io/@sdong001)*

이렇게 App.js에 관한 노드는 Webpack으로 인해 Main Chunk로 번들이 구성된다. 각각의 Chunk도 마찬가지로 homePage.js와 ProductList.js의 노드 들의 번들 형태로 구성된다. 이런 형태는 자바스크립트의 **IIFE(Immediately Invoked Function Expression)함수**로 사용하는데, scope 이슈를 크게 해결하는데 도움을 준다.

## 1.3 Babel 동작 원리

프로젝트를 시작할 때, Babel과 Webpack도 깔고 열심히 코드를 작성하고 빌드를 실패했다.

그리고 다음과 같은 에러 문구가 뜨는 것을 확인 했다.

**Error: "Cannot find module 'babel-preset-env' from (root of my project)"**

그리고 생각 했다. 바벨은 어떤 구조로 동작 하는 가? 나는 바벨을 설치와 용도 관점에서만 알았지, 각각의 모듈이 어떤 알고리즘으로 실행되는지 사전에 찾아 본 적이 없었다. 이 것은 새로운 개념을 공부하는 내가 고쳐야 할 버릇 이기도 했다.

```json
{
	plugins: ['@babel/plugin-XXXXXXXX....']
}
```

위와 같은 예시로, 사용하려는 Babel 플러그인이 컨피그 Dependency 영역에 추가 되어야 한다.

그러면 `.babelrc` 파일은 Babel에게 해당 플러그인을 사용해서 소스 코드를 컴파일 할 것을 명령한다.

번외로, 자주 쓰이는 plugin들을 한데 묶은 것을 preset 이라고 부르는데 Babel 에서는 preset 플러그인을 설치하면 특수한 경우가 아니고는 무난하게 컴파일이 되는 것을 알 수 있다.

## 2. Component vs Class

자바와 같이 컴파일러 언어에 익숙한 나는, 자바스크립트 라이브러리를 구성하는 component 단위를 사용하는 것이 신기했다. 클래스 처럼 상속 받아서 부모와 자식 간의 관계를 정의 해주면 될 것을,  왜 자바스크립트 에서는 여러개의 component로 분할 시켜 놓아서 매 작업 마다 가져다 써야 하는건지 직접 템플릿을 만들기 전 까지는 이해를 할 수 없었다. 여기에는, 내가 real-time development 라는 개념을 잘 모르고 있어서 이기도 했다.

아래 유명한 두 예시의 코드가 있다. 아래의 코드를 활용해 간단한 페이지를 설계 한 후, 테스트 해보자.

1. A와 B 각각의 follow 버튼이 존재하고
2. 3초가 지나기 전에 다른 프로필을 follow 한다.
3. 이 때, 렌더링 되는 alert 메시지를 읽는다.

```jsx
function testRealtimePage(props) {
	const showMessage = () => {
		alert('Followed ' + props.user);
	}
	const handleClick = () => {
		setTimeout(showMessage, 3000);
	}

};

class testRealtimePage extends React.Component {
	showMessage = () => {
		alert('Followed ' + this.props.user);
	};
	handleClick = () => {
		setTimeout(this.showMessage, 3000);
	};
};
```

위의 코드 중에서 class를 사용한 코드는 결과가 버그로 도출된다. 왜 일까? 답은 showMessage 메서드와 this에 있다. 이 메서드는 `this.props.user` 로 부터 값을 가져온다. 리액트에서 props는 immutable한 값이다.

하지만 this는 mutable하고 조작이 가능한 값이다. 

리액트는 시간이 지나면서 변경 사항을 업데이트 하기 때문에 클래스 컴포넌트가 렌더링 되면 새롭게 바뀐 부분만 가져올 수 밖에 없다. 이 예시를 통해, 클래스 컴포넌트와 함수형 컴포넌트는 각각의 목적이 다르기 때문에 코드 작성시 이 부분을 유념할 필요가 있을 것 같다. 차후 발생하는 버그를 해결하는 것 보다도 각각의 컴포넌트 동작을 분석하고 이해한다면 이슈를 조금 더 줄일 수 있지 않을까?

## 3. 개발 환경 구축 하기

개발 환경 구축에 앞서, 간단한 용어를 정리하고자 한다.
- `nvm` 은 node.js의 `version manager` 이다.
- `npm` 은 node.js의 **package manager** 이다.
- `yarn` 은 Facebook에서 만든 **javascript package manager** 이다.

## nvm 설치 하기

1. 우선 [nvm repository](https://github.com/nvm-sh/nvm) 에 들어가서 `repo`를 로컬 위치에 `git clone`을 받는다.
2. 아래의 명령어를 사용해 `nvm`을 설치 한다.  
**이 때, 버전 정보는 설치 하려는 최신 버전이 맞는지 확인 한 후, 설치 하는 것이 좋다.**
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```
3. 버전 확인 하기
```
nvm --version
```
`nvm` 이 잘 설치 되지 않았을 경우, vim을 열어 `.bash_profile` 에 다음 스크립트를 추가해야 합니다.
```
export NVM_DIR="${로컬 경로}/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # this loads nvm
```
4. `nvm` 으로 node.js 설치 하기
- 최신 버전 설치
```
nvm install node
node --version
```
- nvm lts로 버전을 골라서 설치 하기
```
nvm install --lts ## lts 설치
nvm install (버전 정보)
node --version
```

## nvm 명령어

현재 `nvm` 이 관리하고 있는 node.js의 버전은 하나 뿐이고, 그 이름은 `system` 이다. `nvm` 이 가리키고 있는 노드의 버전을 확인하는 명령어는 다음과 같다.
```
nvm ls
```
`nvm` 이 특정 버전을 선택해서 사용할 때는 verb로 `use` 를 사용한다.

## package manager install

대체로 `npm`과 `yarn` 둘 중 하나를 사용하기 때문에 익숙 한 것 한 가지를 선택해서 설치 하면 된다.

**npm install command**
```
(추가 예정)
```

