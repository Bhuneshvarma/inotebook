
import AddNote from './AddNote';
import Notes from './Notes';
import PropTypes from 'prop-types';

const Home = (props) => {

  const { showAlert } = props;

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Notes showAlert={showAlert} />
    </>
  )
};

Home.propTypes = {
  showAlert: PropTypes.func
}

export default Home;
