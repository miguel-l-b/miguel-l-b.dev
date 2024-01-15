export interface ConnectProps {
  isFinished?: boolean;
}

export default function Connect(props: ConnectProps) {
  return (
    <>
      <div className="w-12 md:w-5 h-5 md:h-12 bg-blue-dark mt-[0.5rem] mx-[-0.5rem] md:ml-2.5 md:my-[-0.5rem]" />
      {props.isFinished && (
      <>
        <div className="w-5 h-5 bg-blue-dark mt-[0.5rem] md:mt-auto md:ml-2.5 rounded-full" />
      </>
      )}
    </>
  );
}
