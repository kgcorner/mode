import React from 'react'


class UserName extends React.Component {
	constructor(props) {
		super(props)
		this.state = {editMode: 'OFF',
					  value: 'Timon'}

		//bind event handlers to this
		this.handleSpanOnClick = this.handleSpanOnClick.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleOnBlur = this.handleOnBlur.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	handleSpanOnClick() {
		this.setState({editMode: 'ON'})
	}

	handleChange(event) {
		console.log('change')
		this.setState({value: event.target.value});
	}

	handleOnBlur() {
		this.setState({editMode: 'OFF'})
	}

	handleKeyPress(event) {
		if(event.key == 'Enter'){
			this.setState({editMode: 'OFF'})
		}
	}

	moveCaretAtEnd(event) {
		var temp_value = event.target.value
		event.target.value = ''
		event.target.value = temp_value
	}

	render() {
		if(this.state.editMode == 'OFF'){
			return (
				<span className="user-name" onClick={this.handleSpanOnClick}>
				{this.state.value}
				</span>
			)	
		}
		return (
			<input 
				className="user-name"
				autoFocus
				value={this.state.value}
				onChange={this.handleChange}
				onBlur={this.handleOnBlur}
				onKeyPress={this.handleKeyPress}
				onFocus={this.moveCaretAtEnd}
				type="text" />
		)
	}
}

export default UserName