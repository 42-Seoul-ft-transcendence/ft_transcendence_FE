import BackGroundImage from './BackGroundImage';
import CreateRoomButton from './CreateRoomButton';
import JoinRoomButton from './JoinRoomButton.tsx';
import Header from './Header';

const LobbyPage = () => {
  return (
    <BackGroundImage backgroundImageUrl="/src/assets/background_basic.png">
      <Header />
      <div className="flex gap-[15vh] mb-5">
        <CreateRoomButton />
        <JoinRoomButton />
      </div>
    </BackGroundImage>
  );
};

export default LobbyPage;
