/**
 * Generates an intelligent, science-calibrated 7-Day Weekly Fitness Plan
 * based on 7 user preferences.
 */

export function generateWeeklyPlan(answers) {
  const goal = answers[1] || "muscle_gain";
  const experience = answers[2] || "intermediate";
  const environment = answers[3] || "commercial_gym";
  const daysCommitment = answers[4] || "4_days";
  const duration = answers[5] || "45_mins";
  const splitPref = answers[6] || "upper_lower";
  const dietPref = answers[7] || "high_protein_nonveg";

  // Rep ranges and rest based on goal
  let repScheme = "3-4 sets × 8-12 reps";
  let restPeriod = "75 - 90s";
  let intensity = "Moderate-High (RPE 8)";
  let weeklyCalBurn = "2,400 - 3,200 kcal";

  if (goal === "strength_power") {
    repScheme = "4-5 sets × 4-6 reps";
    restPeriod = "120 - 180s";
    intensity = "Maximum Neural Effort (RPE 8.5-9.5)";
    weeklyCalBurn = "2,200 - 2,800 kcal";
  } else if (goal === "fat_loss") {
    repScheme = "3-4 sets × 12-15 reps (Short Rest)";
    restPeriod = "45 - 60s";
    intensity = "High Metabolic Burn (RPE 8)";
    weeklyCalBurn = "3,200 - 4,000 kcal";
  } else if (goal === "lean_athletic") {
    repScheme = "4 sets × 10-12 reps + Plyo finisher";
    restPeriod = "60s";
    intensity = "Athletic Conditioning (RPE 8.5)";
    weeklyCalBurn = "2,800 - 3,500 kcal";
  } else if (goal === "endurance_mobility") {
    repScheme = "3 sets × 15-20 controlled tempo reps";
    restPeriod = "45s";
    intensity = "Steady Core & Joint Tension (RPE 7)";
    weeklyCalBurn = "1,800 - 2,400 kcal";
  }

  // Equipment modifiers for exercise selection
  const isGym = environment === "commercial_gym";
  const isHome = environment === "home_dumbbells";
  const isCalisthenics = environment === "calisthenics";

  // Helper to pick exercises adapted to environment
  const getExercise = (gymVer, homeVer, calVer, muscle, cue, customReps) => {
    let name = gymVer;
    if (isCalisthenics && calVer) name = calVer;
    else if (isHome && homeVer) name = homeVer;

    return {
      name,
      reps: customReps || repScheme,
      rest: restPeriod,
      muscle,
      cue,
      completed: false
    };
  };

  // Build the 7 Days
  const days = [];

  // Structure days depending on frequency commitment
  if (daysCommitment === "3_days") {
    // Mon (Full Body A), Tue (Recovery), Wed (Full Body B), Thu (Recovery), Fri (Full Body C), Sat (Active Cardio), Sun (Rest)
    days.push({
      dayName: "Monday",
      title: "Full Body Compound Foundation (A)",
      type: "Training",
      tag: "Total Body Power",
      duration: getDurationLabel(duration),
      estCalories: 480,
      focus: "Quadriceps, Chest, Upper Back, Core",
      warmup: [
        "5 mins Dynamic Arm Circles & Hip Openers",
        "2 sets × 15 Bodyweight Air Squats & Cat-Cow stretches",
        "1 set Scapular Retractions"
      ],
      exercises: [
        getExercise(
          "Barbell Back Squat",
          "Dumbbell Goblet Squats",
          "Tempo Pistol Squats / Deep Cossack Squats",
          "Quadriceps & Glutes",
          "Drive knees outward, brace core 360°, explode out of the hole."
        ),
        getExercise(
          "Barbell Incline Bench Press",
          "Dumbbell Flat Press with Twist",
          "Decline Explosive Push-Ups",
          "Upper Clavicular Pectoralis",
          "Retract shoulder blades into the bench; tuck elbows at 45 degrees."
        ),
        getExercise(
          "Chest-Supported Neutral Row",
          "Two-Arm Dumbbell Bent-Over Row",
          "Inverted Rows on Table / Bar",
          "Latissimus Dorsi & Rhomboids",
          "Squeeze back at full contraction for a 1-second isometric pause."
        ),
        getExercise(
          "Standing Overhead Dumbbell Press",
          "Seated DB Shoulder Press",
          "Pike Push-Ups on Elevated Surface",
          "Anterior & Lateral Deltoids",
          "Lock out overhead without hyperextending your lumbar spine."
        ),
        getExercise(
          "Hanging Leg Raises / Captain's Chair",
          "Lying Floor Leg Raises with Hip Thrust",
          "L-Sit Hold / Hollow Body Hold (40s)",
          "Rectus Abdominis & Deep Core",
          "Curl pelvis towards ribs; avoid swinging your legs."
        )
      ],
      cooldown: "5 mins foam rolling quads, thoracic spine bridge, child's pose."
    });

    days.push({
      dayName: "Tuesday",
      title: "Active Neurological Recovery & Walk",
      type: "Active Recovery",
      tag: "Tissue Regeneration",
      duration: "30 mins",
      estCalories: 180,
      focus: "Cardiovascular flushing, Parasympathetic reboot",
      warmup: ["Light shoulder dislocations with band or broomstick", "Ankle mobility drills"],
      exercises: [
        {
          name: "8,000 - 10,000 Step Zone-2 Recovery Walk",
          reps: "30-40 continuous minutes",
          rest: "Continuous",
          muscle: "Cardiorespiratory System",
          cue: "Nasal breathing only; keep heart rate between 110-125 BPM for maximum capillary flushing.",
          completed: false
        },
        {
          name: "Deep Hip Flexor & Glute Pigeon Pose",
          reps: "3 sets × 60s per side",
          rest: "30s",
          muscle: "Iliopsoas & Piriformis",
          cue: "Breathe deeply into the belly; feel hips decompressing.",
          completed: false
        },
        {
          name: "Thoracic Extension over Foam Roller",
          reps: "3 sets × 12 slow extensions",
          rest: "30s",
          muscle: "Thoracic Spine & Posture",
          cue: "Exhale as you arch backward over the roller; never roll lumbar spine.",
          completed: false
        }
      ],
      cooldown: "5 minutes guided box breathing (4s in, 4s hold, 4s out, 4s hold)."
    });

    days.push({
      dayName: "Wednesday",
      title: "Full Body Posterior Chain & Density (B)",
      type: "Training",
      tag: "Hinge & Upper Pull",
      duration: getDurationLabel(duration),
      estCalories: 520,
      focus: "Hamstrings, Glutes, Lats, Delts, Triceps",
      warmup: ["Glute Bridges & Banded Clamshells", "Inchworms to Plank × 6 reps"],
      exercises: [
        getExercise(
          "Conventional / Trap Bar Deadlift",
          "Dumbbell Romanian Deadlifts (RDLs)",
          "Single-Leg Bodyweight Deadlift + Nordic Curl Negatives",
          "Erectors, Hamstrings & Gluteus Maximus",
          "Hinge backwards with soft knees, feel deep hamstring stretch, thrust glutes."
        ),
        getExercise(
          "Wide-Grip Lat Pulldown",
          "Single-Arm DB Row on Bench",
          "Strict Pull-Ups / Eccentric Chin-Ups",
          "Latissimus Dorsi",
          "Initiate pull by driving elbows straight into your back pockets."
        ),
        getExercise(
          "Dumbbell Walking Lunges",
          "DB Reverse Deficit Lunges",
          "Bulgarian Split Squats (Elevated Foot)",
          "Quads, Hamstrings & Unilateral Balance",
          "Keep torso tall, front shin close to 90 degrees."
        ),
        getExercise(
          "Incline Dumbbell Lateral Raises",
          "Standing DB Lateral Raises (Slow Tempo)",
          "Lateral Arm Levers / Resistance Band Raises",
          "Medial Deltoids (Cap Shoulders)",
          "Lead with elbows, slight pinky tilt, 2-second negative."
        ),
        getExercise(
          "Cable Rope Tricep Pressdowns",
          "Overhead DB Tricep Extension",
          "Bench Dips / Diamond Push-Ups",
          "Triceps Brachii (Lateral & Long Head)",
          "Pin elbows against your ribcage; flare rope outwards at the bottom."
        )
      ],
      cooldown: "Standing hamstring stretch, doorway chest opener, cobra stretch."
    });

    days.push({
      dayName: "Thursday",
      title: "Rest & Myofascial Release",
      type: "Rest",
      tag: "Complete Rest",
      duration: "20 mins",
      estCalories: 120,
      focus: "Central Nervous System Recharge & Glycogen Replenishment",
      warmup: ["Neck and spinal circles"],
      exercises: [
        {
          name: "Myofascial Foam Rolling Session",
          reps: "15 minutes full body coverage",
          rest: "None",
          muscle: "IT Bands, Quads, Calves, Lats",
          cue: "Pause on tender trigger spots for 20-30 seconds until tension melts.",
          completed: false
        },
        {
          name: "Hydration & Electrolyte Saturator",
          reps: "1L water + lemon + mineral pinch",
          rest: "All Day",
          muscle: "Systemic Hydration",
          cue: "Replenish intracellular water pools for tomorrow's big session.",
          completed: false
        }
      ],
      cooldown: "Epsom salt warm bath or sauna recommended."
    });

    days.push({
      dayName: "Friday",
      title: "Full Body Hypertrophy & Arms Finisher (C)",
      type: "Training",
      tag: "Aesthetic Hypertrophy",
      duration: getDurationLabel(duration),
      estCalories: 490,
      focus: "Chest, Shoulders, Biceps, Core, Glutes",
      warmup: ["Arm circles, Banded pull-aparts, World's Greatest Stretch"],
      exercises: [
        getExercise(
          "Dumbbell Flat Bench Press",
          "Floor Dumbbell Press with Isometric Squeeze",
          "Archer Push-Ups / Wide Push-Ups",
          "Pectoralis Major",
          "Feel full chest stretch at the bottom without bouncing."
        ),
        getExercise(
          "Leg Press or Hack Squat",
          "DB Goblet Cyclist Squats (Heels Elevated)",
          "1.5 Rep Bodyweight Squats",
          "Vastus Medialis (Teardrop Muscle)",
          "Elevate heels 1-2 inches for deep quad focus."
        ),
        getExercise(
          "Cable Seated Row (Close Grip)",
          "Dumbbell Bent-Over Row (Palms Facing)",
          "Towel Pull-Ups / Inverted Neutral Rows",
          "Mid-Traps & Rhomboids",
          "Pull towards navel, keep shoulders depressed away from ears."
        ),
        getExercise(
          "Incline Dumbbell Bicep Curls",
          "Alternating DB Hammer Curls",
          "Chin-Up Isometric Hold (30s) + Bicep Negative",
          "Biceps Brachii & Brachialis",
          "Keep upper arms perpendicular to the floor; do not swing shoulders."
        ),
        getExercise(
          "Ab Wheel Rollouts or Cable Woodchoppers",
          "Plank to Dolphin Pose",
          "Plank Shoulder Taps + Mountain Climbers",
          "Transverse Abdominis & Obliques",
          "Brace core tight, do not let lower back sag."
        )
      ],
      cooldown: "Bicep doorway stretch, hamstring fold, seated spinal twist."
    });

    days.push({
      dayName: "Saturday",
      title: "Metabolic Aerobic Engine & Play",
      type: "Active Recovery",
      tag: "Zone-2 Cardio & Fun",
      duration: "35 mins",
      estCalories: 260,
      focus: "Mitochondrial biogenesis & VO2 max base",
      warmup: ["Ankle hops, light jogging in place"],
      exercises: [
        {
          name: "Zone-2 Steady Cardio (Cycling / Incline Treadmill / Rucking)",
          reps: "30-40 continuous minutes",
          rest: "None",
          muscle: "Cardiovascular Heart & Lungs",
          cue: "Maintain conversational pace where you can speak in full sentences.",
          completed: false
        },
        {
          name: "Active Hanging from Pull-Up Bar",
          reps: "4 sets × 35 seconds",
          rest: "45s",
          muscle: "Shoulder Subacromial Space & Grip",
          cue: "Decompresses spinal discs and restores healthy shoulder mechanics.",
          completed: false
        }
      ],
      cooldown: "Full body static stretching."
    });

    days.push({
      dayName: "Sunday",
      title: "Total System Reset & Meal Prep Day",
      type: "Rest",
      tag: "Rest & Prep",
      duration: "20 mins",
      estCalories: 100,
      focus: "Mental Clarity, Grocery Fuel, Sleep Optimization",
      warmup: ["Mindful breathing"],
      exercises: [
        {
          name: "Weekly Meal Prep & Macro Organization",
          reps: "Cook batch proteins & clean complex carbs",
          rest: "None",
          muscle: "Habit & Discipline",
          cue: "Prepare 4-5 high protein lunch boxes for the upcoming week.",
          completed: false
        },
        {
          name: "9-Hour Sleep Target Tonight",
          reps: "Blackout curtains, 19°C room temp",
          rest: "All Night",
          muscle: "HGH & Testosterone Secretion",
          cue: "Turn off screens 60 minutes before bedtime; read a physical book.",
          completed: false
        }
      ],
      cooldown: "Deep sleep state."
    });
  } else if (daysCommitment === "5_days" || daysCommitment === "6_days") {
    // 5-6 Day Split: Push, Pull, Legs, Push/Upper, Pull/Lower, etc.
    days.push({
      dayName: "Monday",
      title: "Push Heavy (Chest, Front Delts, Triceps)",
      type: "Training",
      tag: "Upper Push",
      duration: getDurationLabel(duration),
      estCalories: 510,
      focus: "Pectoralis, Anterior Deltoids, Lateral Head Triceps",
      warmup: ["Rotator cuff external rotations", "Band pull-aparts", "Push-up tempo warm-up"],
      exercises: [
        getExercise(
          "Barbell / Dumbbell Flat Bench Press",
          "Dumbbell Floor Press (Heavy)",
          "Archer / Diamond Push-Ups (Weighted)",
          "Chest & Anterior Deltoid",
          "Arch upper back, plant feet flat, touch mid-sternum, drive upward."
        ),
        getExercise(
          "Incline Dumbbell Press (30 Degree Angle)",
          "Incline DB Hex Press",
          "Feet-Elevated Push-Ups (Decline)",
          "Upper Clavicular Chest",
          "Maintain deep stretch at the bottom without over-flaring elbows."
        ),
        getExercise(
          "Standing Military Barbell / Dumbbell Overhead Press",
          "Seated DB Overhead Press",
          "Strict Pike Push-Ups against Wall",
          "Shoulders & Core Stability",
          "Squeeze glutes and abs to protect lumbar spine."
        ),
        getExercise(
          "Cable Lateral Raises (Behind Back)",
          "Dumbbell Lateral Raises (Lean-Away)",
          "Resistance Band Side Raises (Slow Eccentric)",
          "Lateral Deltoid",
          "Pause 1s at parallel, 3s descent for maximum time-under-tension."
        ),
        getExercise(
          "Tricep Overhead Cable Rope Extension",
          "Overhead DB Tricep French Press",
          "Bodyweight Tricep Bodyweight Skullcrushers",
          "Triceps Long Head",
          "Get a deep stretch behind the head, squeeze triceps at lockout."
        )
      ],
      cooldown: "Doorway pec stretch, overhead tricep stretch, child's pose."
    });

    days.push({
      dayName: "Tuesday",
      title: "Pull Heavy (Back, Rear Delts, Biceps)",
      type: "Training",
      tag: "Upper Pull",
      duration: getDurationLabel(duration),
      estCalories: 530,
      focus: "Latissimus Dorsi, Traps, Rhomboids, Biceps",
      warmup: ["Cat-cow", "Scapular pull-ups", "Dead hangs"],
      exercises: [
        getExercise(
          "Weighted Pull-Ups or Lat Pulldowns",
          "Weighted Chin-Ups / Band-Assisted",
          "Wide Grip Pull-Ups (Chest to Bar)",
          "Latissimus Dorsi (V-Taper)",
          "Drive elbows straight down, avoid excessive swinging."
        ),
        getExercise(
          "Barbell Bent-Over Row (Underhand Grip)",
          "Dumbbell Chest Supported Row",
          "Inverted Australian Body Rows",
          "Mid Back & Lower Traps",
          "Pull barbell to the belly button; pinch shoulder blades together."
        ),
        getExercise(
          "Single-Arm Dumbbell Row",
          "Heavy Single DB Sawmill Row",
          "Single-Arm Towel Rows",
          "Lat Thickness & Core Anti-Rotation",
          "Pull towards the hip, not straight up to the shoulder."
        ),
        getExercise(
          "Face Pulls with External Rotation",
          "Banded Face Pulls",
          "Prone Y-T-W Floor Raises",
          "Rear Deltoids & Rotator Cuff",
          "Pull rope towards eyes, separating hands for rear delt recruitment."
        ),
        getExercise(
          "Incline Dumbbell Bicep Curls",
          "Standing Dumbbell Hammer Curls",
          "Chin-Up Isometric Negative Curls",
          "Biceps & Forearms",
          "Full supination at the top, squeeze the bicep peak."
        )
      ],
      cooldown: "Lat doorway hang stretch, wrist extension stretches."
    });

    days.push({
      dayName: "Wednesday",
      title: "Legs & Posterior Power",
      type: "Training",
      tag: "Lower Body",
      duration: getDurationLabel(duration),
      estCalories: 560,
      focus: "Quads, Hamstrings, Glutes, Calves",
      warmup: ["Leg swings", "Banded monster walks", "Deep goblet squat holds"],
      exercises: [
        getExercise(
          "Barbell Back Squat / Front Squat",
          "Heavy DB Goblet Squats with 3s Pause",
          "Pistol Squats / Cossack Squats",
          "Quadriceps & Adductors",
          "Chest up, push floor away through the midfoot."
        ),
        getExercise(
          "Barbell Romanian Deadlift (RDL)",
          "Dumbbell RDL with Slow 3s Negative",
          "Single Leg RDL + Glute Bridge Kicks",
          "Hamstrings & Glute-Ham Tie-In",
          "Push hips as far back as possible until hamstrings are taut."
        ),
        getExercise(
          "Bulgarian Split Squats",
          "Bulgarian Split Squats (Dumbbells)",
          "Elevated Bulgarian Split Squats (Bodyweight)",
          "Single-Leg Stability & Quad Hypertrophy",
          "Slight forward torso lean targets glutes; upright torso targets quads."
        ),
        getExercise(
          "Lying Leg Curls or Seated Hamstring Curl",
          "Slider / Swiss Ball Hamstring Curls",
          "Nordic Hamstring Curl Negatives",
          "Biceps Femoris (Hamstring Belly)",
          "Control the eccentric phase without lifting hips off the bench."
        ),
        getExercise(
          "Standing Calf Raises",
          "Single-Leg Calf Raises on Step",
          "Deficit Single-Leg Bodyweight Calf Raises",
          "Gastrocnemius & Soleus",
          "Deep 2-second stretch at bottom, 1-second pause on toes."
        )
      ],
      cooldown: "Pigeon stretch, kneeling quad stretch, foam rolling IT bands."
    });

    days.push({
      dayName: "Thursday",
      title: "Active Recovery & Mobility Flow",
      type: "Active Recovery",
      tag: "System Regeneration",
      duration: "30 mins",
      estCalories: 200,
      focus: "Hip decompression, shoulder mobility, recovery walk",
      warmup: ["Gentle sun salutations", "Cat-Cow"],
      exercises: [
        {
          name: "Zone 2 Low-Intensity Incline Walk / Bike",
          reps: "30 minutes continuous",
          rest: "None",
          muscle: "Aerobic Base & Heart Rate Recovery",
          cue: "Breathe through nose only. Flush metabolic waste from legs.",
          completed: false
        },
        {
          name: "Couch Stretch for Tight Hip Flexors",
          reps: "3 sets × 60s per leg",
          rest: "30s",
          muscle: "Psoas & Rectus Femoris",
          cue: "Squeeze glute of back leg to open the hip front.",
          completed: false
        },
        {
          name: "Dead Hangs for Spinal Decompression",
          reps: "3 sets × 45 seconds",
          rest: "45s",
          muscle: "Spine & Shoulder Capsule",
          cue: "Completely relax lower body and let gravity lengthen vertebrae.",
          completed: false
        }
      ],
      cooldown: "5 minutes mindful meditation."
    });

    days.push({
      dayName: "Friday",
      title: "Push Hypertrophy & Delts Specialization",
      type: "Training",
      tag: "Hypertrophy Volume",
      duration: getDurationLabel(duration),
      estCalories: 480,
      focus: "Chest Upper Clavicular, Lateral Delts, Triceps",
      warmup: ["Band pull aparts", "Scapular push ups", "Arm swings"],
      exercises: [
        getExercise(
          "Dumbbell Incline Bench Press",
          "Dumbbell Incline Press on Stability Ball / Floor",
          "Deficit Push-Ups on Handles / Books",
          "Upper Chest",
          "Focus on bringing your biceps together at the peak contraction."
        ),
        getExercise(
          "Dumbbell Flat Flyes / Cable Crossover",
          "Dumbbell Floor Flyes",
          "Ring Flyes / Slide Board Chest Pushouts",
          "Sternal Pectoralis",
          "Slight bend in elbows, feel massive stretch across chest."
        ),
        getExercise(
          "Dumbbell Arnold Press",
          "Dumbbell Arnold Press Seated",
          "Handstand Wall Hold (45s)",
          "Anterior & Medial Delts",
          "Rotate palms smoothly from facing inward to outward overhead."
        ),
        getExercise(
          "Dumbbell Lateral Raise Dropset",
          "Lateral Raise with Hold at Top",
          "Resistance Band Side Pulses",
          "Lateral Deltoid Caps",
          "Perform 12 reps, drop weight 20%, pump out 8 more reps."
        ),
        getExercise(
          "Dips (Parallel Bars)",
          "Bench Dips with Feet Elevated",
          "Chair / Bench Dips",
          "Lower Chest & Triceps",
          "Lean forward 15 degrees to hit chest; stay upright to hit triceps."
        )
      ],
      cooldown: "Overhead tricep stretch, chest wall slide."
    });

    days.push({
      dayName: "Saturday",
      title: "Pull Volume, Core & HIIT Burn",
      type: "Training",
      tag: "Pull & Athletic Core",
      duration: getDurationLabel(duration),
      estCalories: 510,
      focus: "Rhomboids, Lats, Biceps, Rectus & Obliques",
      warmup: ["World's greatest stretch, inchworms"],
      exercises: [
        getExercise(
          "Close-Grip Lat Pulldowns",
          "Single DB Row with 2s Peak Hold",
          "Towel Pull-Ups (Grip Strength)",
          "Lower Lats & Forearms",
          "Pull handle to mid-chest while keeping spine arched."
        ),
        getExercise(
          "Barbell / EZ-Bar Bicep Curls",
          "Dumbbell Hammer Curls",
          "Doorframe Bicep Pulls / Table Curls",
          "Biceps Brachii",
          "Strict form, zero back swing, control the downward descent."
        ),
        getExercise(
          "Reverse Pec Deck / DB Rear Delt Flyes",
          "Bent-Over Dumbbell Rear Flyes",
          "Prone Floor Y-Raises",
          "Rear Deltoids",
          "Think about pushing knuckles outward to the side walls."
        ),
        getExercise(
          "Hanging Windshield Wipers / Cable Russian Twists",
          "Floor Russian Twists with Dumbbell",
          "Side Plank Dips + Bicycle Crunches",
          "Obliques & Rotational Power",
          "Control rotational velocity; engage core throughout the arc."
        ),
        getExercise(
          "Kettlebell / Dumbbell Swings or HIIT Finisher",
          "DB Dumbbell Swings",
          "Burpees to Tuck Jumps (5 sets × 45s)",
          "Full Body Metabolic Conditioning",
          "Snap hips forward explosively, contract glutes at the top."
        )
      ],
      cooldown: "Seated hamstring stretch, child's pose with side reaches."
    });

    days.push({
      dayName: "Sunday",
      title: "Complete Rest & High-Protein Recharge",
      type: "Rest",
      tag: "CNS Recovery",
      duration: "0 mins",
      estCalories: 100,
      focus: "Muscle protein accretion, sleep recovery, family time",
      warmup: ["Gentle walking if desired"],
      exercises: [
        {
          name: "Optimal Sleep & Nutrition Protocol",
          reps: "8-9 Hours Restorative Sleep",
          rest: "All Day",
          muscle: "Systemic Nervous System",
          cue: "Refuel with adequate protein and hydration to prepare for Monday's push session.",
          completed: false
        }
      ],
      cooldown: "Ready for another week of progress."
    });
  } else {
    // 4 Days: Classic Upper / Lower Split (Mon: Upper A, Tue: Lower A, Wed: Rest, Thu: Upper B, Fri: Lower B, Sat: Cardio, Sun: Rest)
    days.push({
      dayName: "Monday",
      title: "Upper Body Strength & Density (A)",
      type: "Training",
      tag: "Upper Power",
      duration: getDurationLabel(duration),
      estCalories: 490,
      focus: "Chest, Upper Back, Shoulders, Arms",
      warmup: ["Band pull aparts", "Arm circles", "Scapular push ups"],
      exercises: [
        getExercise(
          "Flat Barbell Bench Press",
          "Flat Dumbbell Press (Heavy)",
          "Archer Push-Ups / Weighted Floor Push-Ups",
          "Pectoralis Major & Triceps",
          "Maintain tucked shoulder blades, control 3-second descent, drive up."
        ),
        getExercise(
          "Bent-Over Barbell Row",
          "Two-Arm DB Bent-Over Row",
          "Inverted Australian Body Rows",
          "Mid Back & Latissimus",
          "Keep torso at 45 degrees, pull barbell into upper abdomen."
        ),
        getExercise(
          "Standing Overhead Press (OHP)",
          "Seated Dumbbell Shoulder Press",
          "Elevated Pike Push-Ups",
          "Anterior & Medial Delts",
          "Brace glutes and core; press straight overhead through your center of gravity."
        ),
        getExercise(
          "Wide Grip Lat Pulldown / Pull-Ups",
          "Single-Arm DB Row on Bench",
          "Strict Pull-Ups (Full Lockout)",
          "Upper Lats (V-Taper)",
          "Depress scapulae before pulling; feel wide back engagement."
        ),
        getExercise(
          "EZ-Bar Bicep Curls superset with Tricep Pushdowns",
          "DB Bicep Curls superset with Overhead DB Extension",
          "Doorframe Curls superset with Diamond Push-Ups",
          "Biceps & Triceps Arms Superpump",
          "Perform both movements back-to-back with zero rest between."
        )
      ],
      cooldown: "Doorway chest opener, cross-body shoulder stretch."
    });

    days.push({
      dayName: "Tuesday",
      title: "Lower Body Quad Dominant & Core (A)",
      type: "Training",
      tag: "Lower Hypertrophy",
      duration: getDurationLabel(duration),
      estCalories: 530,
      focus: "Quadriceps, Glutes, Calves, Deep Abdominals",
      warmup: ["90/90 hip flow", "Bodyweight squats with pause", "Glute bridges"],
      exercises: [
        getExercise(
          "Barbell Back Squat",
          "Heavy DB Goblet Squats (Heels Elevated)",
          "Bodyweight 1.5 Tempo Squats / Pistol Squats",
          "Quadriceps & Gluteus Maximus",
          "Knees track over second toe; drive through full foot."
        ),
        getExercise(
          "Dumbbell Walking Lunges",
          "DB Walking Lunges or Reverse Lunges",
          "Alternating Reverse Lunges with Pulse",
          "Glutes, Quads & Unilateral Balance",
          "Keep front knee behind toes; light tap of rear knee to ground."
        ),
        getExercise(
          "Leg Press or Hack Squat",
          "DB Romanian Deadlift (RDL)",
          "Single-Leg Bodyweight Deadlift",
          "Quads / Hamstrings",
          "Smooth continuous tension, no lockout at the very top."
        ),
        getExercise(
          "Standing Calf Raises",
          "Single Leg DB Calf Raises",
          "Deficit Bodyweight Calf Raises on Step",
          "Calves & Achilles Tendon",
          "2s pause at bottom stretch, explosive raise to peak contraction."
        ),
        getExercise(
          "Hanging Leg Raises",
          "Lying Leg Raises with Hip Lift",
          "Plank to Pike Crunches",
          "Lower Rectus Abdominis",
          "Tilt pelvis up towards chin to fully recruit lower abs."
        )
      ],
      cooldown: "Quad stretch against wall, pigeon pose, hamstring fold."
    });

    days.push({
      dayName: "Wednesday",
      title: "Mid-Week Tissue Regeneration & Walk",
      type: "Active Recovery",
      tag: "Regeneration",
      duration: "30 mins",
      estCalories: 190,
      focus: "Cardiovascular flush & CNS recovery",
      warmup: ["Gentle neck and spine mobility"],
      exercises: [
        {
          name: "Zone 2 Brisk Outdoor Walk",
          reps: "35-45 minutes continuous",
          rest: "Continuous",
          muscle: "Heart & Lymphatic Drainage",
          cue: "Sunlight exposure, nasal breathing, relaxing pace.",
          completed: false
        },
        {
          name: "World's Greatest Stretch & Thoracic Opener",
          reps: "3 sets × 6 reps each side",
          rest: "30s",
          muscle: "Thoracic Spine, Groin, Hamstrings",
          cue: "Lunge forward, drop inside elbow to floor, rotate chest open to ceiling.",
          completed: false
        }
      ],
      cooldown: "Hydration with electrolyte water."
    });

    days.push({
      dayName: "Thursday",
      title: "Upper Body Hypertrophy & Arms (B)",
      type: "Training",
      tag: "Upper Hypertrophy",
      duration: getDurationLabel(duration),
      estCalories: 480,
      focus: "Upper Chest, Rear Delts, Lats, Arms",
      warmup: ["Band pull aparts", "Arm circles"],
      exercises: [
        getExercise(
          "Incline Dumbbell Press (30 Degrees)",
          "Incline DB Press on Floor/Pillow",
          "Feet-Elevated Push-Ups",
          "Clavicular Upper Pecs",
          "Full range of motion, elbows tucked at 45 degrees."
        ),
        getExercise(
          "Seated Cable Cable Row (Neutral Grip)",
          "Single Arm DB Sawmill Row",
          "Inverted Australian Neutral Rows",
          "Mid Back & Lats",
          "Squeeze shoulder blades together for 1s count."
        ),
        getExercise(
          "Dumbbell Lateral Raises (Strict)",
          "DB Side Lateral Raises with Pause",
          "Resistance Band Side Lateral Raises",
          "Medial Deltoid Cap",
          "Raise to shoulder height; avoid swinging upper body."
        ),
        getExercise(
          "Incline Dumbbell Bicep Curls",
          "Alternating DB Hammer Curls",
          "Doorframe Bicep Pull Curls",
          "Biceps Brachii & Forearms",
          "Keep elbows pinned; isolate the elbow flexors."
        ),
        getExercise(
          "Overhead Cable Tricep Extension",
          "Overhead DB French Press",
          "Tricep Chair Dips with 2s hold",
          "Triceps Long Head",
          "Full overhead elbow flexion provides maximum muscle stretch."
        )
      ],
      cooldown: "Doorway pec stretch, tricep overhead reach."
    });

    days.push({
      dayName: "Friday",
      title: "Lower Body Posterior Chain & Power (B)",
      type: "Training",
      tag: "Lower Posterior",
      duration: getDurationLabel(duration),
      estCalories: 510,
      focus: "Hamstrings, Glutes, Lower Back, Core",
      warmup: ["Glute bridges", "Hamstring sweep kicks"],
      exercises: [
        getExercise(
          "Barbell Romanian Deadlift (RDL)",
          "Dumbbell RDL with Slow 3s Negative",
          "Single-Leg Bodyweight RDL + Glute Kicks",
          "Hamstrings & Gluteus Maximus",
          "Hinge hips backwards, feel deep hamstring tension, snap hips forward."
        ),
        getExercise(
          "Bulgarian Split Squats (Glute Focused)",
          "Bulgarian Split Squats (Dumbbells)",
          "Bulgarian Split Squats (Bodyweight)",
          "Glutes & Quadriceps",
          "Lean forward 20 degrees at hips to target glute-ham tie in."
        ),
        getExercise(
          "Leg Curl Machine (Lying or Seated)",
          "Dumbbell Floor Glute-Ham Thrust",
          "Floor Glute Bridge with 3s Squeeze",
          "Hamstrings & Glutes",
          "Squeeze hard at top, slow 3s descent."
        ),
        getExercise(
          "Standing Calf Raises on Step",
          "Single Leg DB Calf Raises",
          "Bodyweight Deficit Calf Raises",
          "Gastrocnemius",
          "Full ankle dorsiflexion and plantarflexion."
        ),
        getExercise(
          "Ab Wheel Rollout or Cable Crunch",
          "Plank Shoulder Taps",
          "Hollow Body Hold (4 sets × 35s)",
          "Transverse Abdominis",
          "Lock ribcage down towards pelvis."
        )
      ],
      cooldown: "Pigeon pose, standing forward fold, butterfly stretch."
    });

    days.push({
      dayName: "Saturday",
      title: "Optional Functional Cardio & Core",
      type: "Active Recovery",
      tag: "Stamina & Play",
      duration: "30 mins",
      estCalories: 240,
      focus: "Aerobic capacity & mobility",
      warmup: ["Light jumping jacks, hip circles"],
      exercises: [
        {
          name: "Zone 2 Incline Treadmill or Outdoor Cycling",
          reps: "30 minutes continuous",
          rest: "None",
          muscle: "Heart & Vascular System",
          cue: "Keep your heart rate at 60-70% max. Nasal breathing.",
          completed: false
        },
        {
          name: "Dead Hangs from Bar",
          reps: "4 sets × 40 seconds",
          rest: "45s",
          muscle: "Forearms, Spine & Shoulders",
          cue: "Decompress your spine after heavy squats and deadlifts.",
          completed: false
        }
      ],
      cooldown: "Full body foam rolling."
    });

    days.push({
      dayName: "Sunday",
      title: "Full Neurological Rest & Fueling",
      type: "Rest",
      tag: "Complete Rest",
      duration: "0 mins",
      estCalories: 100,
      focus: "Muscle protein synthesis & mental rest",
      warmup: ["Deep diaphragmatic breathing"],
      exercises: [
        {
          name: "Weekly Nutritional Review & Meal Prep",
          reps: "Prep meals for the week",
          rest: "All Day",
          muscle: "Discipline & Consistency",
          cue: "Cook high-quality lean proteins and complex carbohydrates.",
          completed: false
        }
      ],
      cooldown: "8+ hours restful sleep."
    });
  }

  // Generate metadata header
  const planTitle = getPlanTitle(goal, splitPref, environment);
  const planSummary = getPlanSummary(goal, daysCommitment, environment);

  return {
    title: planTitle,
    summary: planSummary,
    goal,
    experience,
    environment,
    daysCommitment,
    duration,
    splitPref,
    dietPref,
    metrics: {
      intensity,
      repScheme,
      restPeriod,
      weeklyCalBurn,
      trainingDaysPerWeek: daysCommitment.replace("_days", " Days/wk"),
      sessionLength: getDurationLabel(duration)
    },
    days
  };
}

function getDurationLabel(dur) {
  if (dur === "30_mins") return "25 - 35 mins";
  if (dur === "45_mins") return "45 - 50 mins";
  if (dur === "65_mins") return "60 - 75 mins";
  if (dur === "90_mins") return "90+ mins (Elite)";
  return "45 - 50 mins";
}

function getPlanTitle(goal, split, env) {
  const goalNames = {
    fat_loss: "Metabolic Shred & Calorie Torcher",
    muscle_gain: "Hypertrophy Blueprint: Maximum Anabolic Mass",
    lean_athletic: "Athletic Conditioning & Aesthetic Tone",
    strength_power: "Raw Compound Strength & Powerlifting Protocol",
    endurance_mobility: "Functional Longevity, Core & Mobility Matrix"
  };

  const splitNames = {
    ppl: "Push-Pull-Legs Split",
    upper_lower: "Upper-Lower Periodization",
    full_body: "Full-Body Waves",
    hiit_core: "HIIT + Functional Resistance"
  };

  return `${goalNames[goal] || "Elite Physique"} (${splitNames[split] || "Custom Hybrid"})`;
}

function getPlanSummary(goal, days, env) {
  return `Engineered specifically for your goal with optimized mechanical tension, progressive overload milestones, and targeted recovery windows. This plan calibrates exercise selection to your environment with exact coaching cues for optimal mind-muscle connection.`;
}
