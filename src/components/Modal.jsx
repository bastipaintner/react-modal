import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';

const fixedFullSize = css`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const bounce = keyframes`
	0% {
    transform: scale3d(0.1, 0.1, 1);
  }
  55% {
    transform: scale3d(1.08, 1.08, 1);
  }
  75% {
    transform: scale3d(0.95, 0.95, 1);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
`;

// const minimise = keyframes`
//   0% {
//     -webkit-transform: scale3d(1, 1, 1);
//   }
//   100% {
//     -webkit-transform: scale3d(0.1, 0.1, 1);
//   }
// `;

const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;


const ModalWrapper = styled.div`
	${fixedFullSize}
	display: ${({ display }) => display ? 'flex' : 'none'};
	flex-flow: row;
	justify-content: center;
  align-items: center;
`;

const ModalBackdrop = styled.div`
	${fixedFullSize}
	background-color: rgba(233, 234, 242, 0.9);

	animation: ${fadeIn} .1s linear;
`;

const ModalDialog = styled.div`
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0px 12px 30px 0px rgba(218, 216, 227, 1);
	flex: 0 1 500px;
	z-index: 1;

	animation: ${bounce} .3s linear;
`;

const ModalHeader = styled.div`
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	padding: 16px;
	color: rgb(71, 89, 124);

	> h2 {
		margin: 0;
	}
`;

const ModalCloseButton = styled.button`
	font-family: FontAwesome;
	border: none;
	background-color: transparent;
	color: inherit;
	font-size: 20px;
	cursor: pointer;

	&::before { content: '\f00d';	}
`;

const ModalContent = styled.div`
	padding: 16px;
	color: rgb(71, 89, 124);
	
`;

class Modal extends Component {
	constructor(props) {
		super(props);
		this.el = document.createElement('div');
		this.modalRoot = document.getElementById('modal-root');
	};

	componentDidMount() { this.modalRoot.appendChild(this.el) };

	componentWillUnmount() { this.modalRoot.removeChild(this.el)	};

	render() {
		const { title, children, open, toggleModal } = this.props;

		return ReactDOM.createPortal(
			<ModalWrapper display={open}>
				<ModalDialog>
					<ModalHeader>
						<h2>{title}</h2>
						<ModalCloseButton onClick={toggleModal} />
					</ModalHeader>
					<ModalContent>
						{children}
					</ModalContent>
				</ModalDialog>
				<ModalBackdrop onClick={toggleModal} />
			</ModalWrapper>,
			this.el
		);
	};
};

Modal.propTypes = {
	backdropAnimationIn: PropTypes.object,
	backdropAnimationOut: PropTypes.object,
	modalAnimationIn: PropTypes.object,
	modalAnimationOut: PropTypes.object,
	backdropStyle: PropTypes.object,
	titleStyle: PropTypes.object,
	bodyStyle: PropTypes.object,
	closeBtnStyle: PropTypes.object,
};

export default Modal;
