/**
 * The sketch a student would make at step four, and the journey the question
 * asks about at step five.
 *
 * Drawn as strokes so it can draw itself when the step is reached. When the
 * answer appears the train drives the unknown stretch and the "?" resolves
 * into the distance: the motion is the explanation, not decoration.
 */
export function TrainSketch({
  drawing,
  traveling,
  answer,
}: {
  drawing: boolean;
  traveling: boolean;
  answer: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 96"
      fill="none"
      className={`train-sketch w-full max-w-[320px] text-text ${
        drawing ? "is-drawing" : ""
      } ${traveling ? "is-traveling" : ""}`}
    >
      {/* Track */}
      <path
        d="M6 74h308"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ "--len": "310" } as React.CSSProperties}
      />

      {/* Covered distance, measured underneath */}
      <path
        d="M18 88h124M18 83v10M142 83v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ "--len": "150", "--delay": "480ms" } as React.CSSProperties}
      />
      {/* The stretch being asked about */}
      <path
        d="M154 88h150M154 83v10M304 83v10"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 5"
        style={{ "--len": "160", "--delay": "580ms" } as React.CSSProperties}
      />

      {/* Everything that moves lives in one group, so the train travels as a
          unit. transform on a group stays on the compositor. */}
      <g className="train-body">
        {/* Carriage */}
        <path
          d="M18 66V44h58v22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ "--len": "102", "--delay": "120ms" } as React.CSSProperties}
        />
        {/* Engine */}
        <path
          d="M84 66V36h42v30M126 52h16v14"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ "--len": "134", "--delay": "220ms" } as React.CSSProperties}
        />
        {/* Chimney */}
        <path
          d="M96 36v-9h11v9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          style={{ "--len": "30", "--delay": "320ms" } as React.CSSProperties}
        />
        {/* Wheels */}
        <path
          d="M34 66a6 6 0 1 0 .01 0M62 66a6 6 0 1 0 .01 0M104 66a6 6 0 1 0 .01 0M132 66a6 6 0 1 0 .01 0"
          stroke="currentColor"
          strokeWidth="2"
          style={{ "--len": "160", "--delay": "380ms" } as React.CSSProperties}
        />
      </g>

      <text
        x="80"
        y="30"
        className="fill-current font-mono"
        fontSize="13"
        textAnchor="middle"
      >
        240 km
      </text>

      {/* The question resolves into the answer, in place. */}
      <text
        x="228"
        y="66"
        fill="var(--color-accent)"
        className="train-question font-mono"
        fontSize="15"
        textAnchor="middle"
      >
        ?
      </text>
      <text
        x="228"
        y="66"
        fill="var(--color-accent)"
        className="train-answer font-mono"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
      >
        {answer}
      </text>
    </svg>
  );
}
