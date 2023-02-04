import api from "@/api";

function Welcome() {
  const login = async () => {
    const data = await api.login({ userName: "JackMa", userPwd: "123456" });
  };
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Welcome;
