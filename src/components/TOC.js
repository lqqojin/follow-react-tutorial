import React, {Component} from 'react';

class TOC extends Component {
	render() {
		let data = this.props.data;
		let i = 0;
		let lists = [];
		while (i < data.length) {
			lists.push(
				<li key={data[i].id}>
					<a
						href={"/content/"+data[i].id}
						data-id={ data[i].id }
						onClick={ function (ten, id, e) {
							e.preventDefault();
							this.props.onChangePage(e.target.dataset.id);
						}.bind(this, data[i].id, 10) }
					>{data[i].title}</a>
				</li>);
			i += 1;
		}
		return (
			<nav>
				<ul>
					{lists}
				</ul>
			</nav>
		);
	};
}
export default TOC;
