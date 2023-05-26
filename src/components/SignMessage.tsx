import { useSignMessage } from "wagmi";

function SignMessage() {
  const { data, signMessage, isSuccess } = useSignMessage({
    message: "gm wagmi frens",
  });

  return (
    <div>
      <button onClick={() => signMessage()}>Sign Message</button>
      {isSuccess && <div>Signature: {data}</div>}
    </div>
  );
}

export default SignMessage;