const LoadingSpinner = () => {
  const circles = Array.from({ length: 12 });
  return (
    <div className="relative mx-auto my-24 h-10 w-10">
      {circles.map((_, i) => (
        <div
          key={i}
          className="absolute left-0 top-0 h-full w-full"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div
            className="mx-auto h-[15%] w-[15%] animate-fading-circle rounded-full bg-gray-800"
            style={{ animationDelay: `${-1.1 + i * 0.1}s` }}
          />
        </div>
      ))}
    </div>
  );
};

export default LoadingSpinner;
