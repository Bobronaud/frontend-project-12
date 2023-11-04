import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setModal } from '../../slices/uiSlice.js';
import { setActive } from '../../slices/channelsSlice.js';
import { socket } from '../../socket.js';

const Add = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const channels = useSelector((state) => state.channels.channels);
  const channelsNames = channels.map(({ name }) => name);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(true);
  const [isDisabled, setDisabled] = useState(false);
  const closeModal = () => {
    dispatch(setModal({ type: null }));
  };
  const handlerChange = (e) => {
    setValue(e.target.value);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    setValid(!channelsNames.includes(value));
    if (!channelsNames.includes(value)) {
      socket.emit('newChannel', { name: value }, (res) => {
        dispatch(setActive(res.data.id));
      });
      closeModal();
      toast.success(t('toasts.channelAdd'));
    }
    setDisabled(false);
  };
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.modals.headerAdd')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handlerSubmit}>
          <InputGroup hasValidation>
            <Form.Control
              required
              isInvalid={!isValid}
              className="mb-2"
              ref={inputRef}
              onChange={handlerChange}
              value={value}
              type="text"
            />
            <Form.Control.Feedback type="invalid">
              {t('chat.modals.invalidValue')}
            </Form.Control.Feedback>
          </InputGroup>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={closeModal}>
              {t('chat.modals.buttonClose')}
            </Button>
            <Button type="submit" variant="primary" disabled={isDisabled}>
              {t('chat.modals.buttonSubmit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
