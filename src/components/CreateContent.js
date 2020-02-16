import React, {Component} from 'react';

class CreateContent extends Component {
	render () {
		return (
			<article>
				<h2>Create</h2>
				<form action="/create_process" method="POST" onSubmit={
					function (e) {
						e.preventDefault();
						this.props.onSubmit(e.target.title.value, e.target.desc.value);
					}.bind(this)
				}>
					<p><input type="input" name="title" placeholder="title"/></p>
					<p>
						<textarea name="desc" placeholder="description" id="" cols="30" rows="10"/>
					</p>
					<p>
						<input type="submit"/>
					</p>
				</form>
			</article>
		)
	}
}

export default CreateContent;
