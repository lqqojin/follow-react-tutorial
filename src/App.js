import TOC from './components/TOC';
import Subject from './components/Subject';
import Control from './components/Control'
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
	constructor (props) {
		super(props);
		// 어떠한 컴포넌트가 실행될때 render라는 함수보다 먼저 실행되면서 코드를 초기화 시켜줄려고 할때
		// constructor 안에서 코드 짜면 된다.
		// 먼저 실행 돼서 초기화 담당
		this.MAX_CONTENT_ID = 3;
		this.state = {
			/**
			 * App 이 내부적으로 사용되는 형태는 철저히 은닉한다.
			 */
			mode: 'welcome',
			selected_content_id: 0,
			subject: {
				title: 'WEB',
				sub: 'World Wide Web!',
			},
			welcome: {
				title: 'Welcome',
				desc: 'Hello, React'
			},
			contents: [
				{ id: 1, title: 'HTML', desc: 'HTML is for information'},
				{ id: 2, title: 'CSS', desc: 'CSS is for design'},
				{ id: 3, title: 'JavaScript', desc: 'JavsScript is for Interactive'}
			]
		}
	}

	getReadContent() {
		let i = 0;
		while (i < this.state.contents.length) {
			let data = this.state.contents[i];
			console.log(this.state.contents, this.state.selected_content_id);
			if (data.id === this.state.selected_content_id) {
				return data;
			}
			i += 1;
		}
	};

	getContent() {
		let _title= null;
		let _desc = null;
		let _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}/>;
		} else if (this.state.mode === 'read') {
			var _content = this.getReadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc}/>;
		} else if (this.state.mode === 'create') {

			_article = <CreateContent onSubmit={function (_title, _desc) {

				this.MAX_CONTENT_ID = this.MAX_CONTENT_ID + 1;
				// concat push 비교
				let _contents = this.state.contents.concat({
					id: this.MAX_CONTENT_ID,
					title: _title,
					desc: _desc
				});

				this.setState({
					contents: _contents,
					mode: 'read',
					selected_content_id: this.MAX_CONTENT_ID
				})

			}.bind(this)}/>
		} else if (this.state.mode === 'update') {
			_content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
				// 새로운 복제
				let _contents = Array.from(this.state.contents);
				console.log(_id, _title, _desc);
				let i = 0;
				while(i < _contents.length) {
					if(_contents[i].id === _id) {
						_contents[i].title = _title;
						_contents[i].desc = _desc;
						break;
					}
					i += 1;
				}
				this.setState({
					contents: _contents
				})

			}.bind(this)}/>
		} else if (this.state.mode === 'delete') {

		}
		// console.log('render', this); // this 는 컴포넌트 자신을 가리킨다.
		return _article;
	}

	render() {
		console.log('App render');
		return (
			<div className="App">
				<Subject
					title={this.state.subject.title}
					sub={this.state.subject.sub}
					onChangePage={function() {
						this.setState({ mode: 'welcome' });
					}.bind(this)}
				>
				</Subject>
				<TOC
					onChangePage={ function(id) {
						this.setState({
							mode: 'read',
							selected_content_id: Number(id)
						});
					}.bind(this) }
					data={this.state.contents}
				/>
				<Control
					onChangeMode={ function (_mode) {
						if (_mode === 'delete') {
							if (window.confirm('Really?')) {
								var _contents = Array.from(this.state.contents);
								let i = 0;
								while(i < _contents.length) {
									if(_contents[i].id === this.state.selected_content_id) {
										_contents.splice(i, 1);
										break;
									}
									i += 1;
								}
								this.setState({
									mode: 'welcome',
									contents: _contents
								});
								alert('deleted');
							}
						} else {
							this.setState({
								mode: _mode
							})
						}
					}.bind(this) }
				/>
				{this.getContent()}
			</div>
		);
	};
}

export default App;
