function Message() {
  return (
    <div className="chat chat-end">
      <div className="chat-image  avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt="Tailwind css  chat bubble component"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">Hi! What is upp?</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        12:12
      </div>
    </div>
  );
}

export default Message;
