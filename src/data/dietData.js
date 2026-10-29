export const dietCategories = [
  { id: "all", label: "All Nutrition Pillars" },
  { id: "high_protein", label: "High Protein Science" },
  { id: "cutting_fatloss", label: "Fat Loss & Deficit" },
  { id: "clean_bulking", label: "Clean Muscle Hypertrophy" },
  { id: "pre_post_workout", label: "Pre & Post Workout Fuel" },
  { id: "vegetarian_vegan", label: "Vegetarian & Plant Protein" },
  { id: "supplements", label: "Evidence-Based Supplements" },
  { id: "hydration_recovery", label: "Hydration & Electrolytes" },
];

export const dietArticles = [
  {
    id: "protein_synthesis_leucine",
    category: "high_protein",
    title: "The Leucine Threshold & Muscle Protein Synthesis (MPS)",
    shortDesc: "Why 2.2g of protein per kg bodyweight and 3g of leucine per meal unlocks maximum muscular growth.",
    badge: "Hypertrophy Science",
    level: "Advanced Lifter",
    readTime: "4 min read",
    keyRule: "Target ~0.4g to 0.55g protein per kg of bodyweight per meal, spaced 3.5 to 4.5 hours apart.",
    macrosFocus: "1.8g - 2.4g / kg Total Daily Protein",
    summary: `Muscle Protein Synthesis is triggered not merely by the total amount of protein eaten at night, but by crossing the 'leucine trigger' threshold (~2.7g - 3.5g of pure leucine per bolus). Once triggered, MPS peaks at ~90 minutes and resets after 3 to 4 hours. Consuming protein evenly throughout the day induces 3-4 distinct anabolic spikes compared to backloading all protein into one giant evening feast.`,
    practicalFoods: [
      "Chicken Breast (31g protein / 100g, 2.6g leucine)",
      "Whey Isolate (25g protein / 30g scoop, 3.2g leucine)",
      "Eggs & Egg Whites (6g protein per large whole egg, rich choline)",
      "Low-fat Greek Yogurt (10g protein / 100g, slow-digesting casein)",
      "Paneer / Cottage Cheese (18g protein / 100g, sustained nitrogen retention)",
      "Tempeh / Edamame (19g protein / 100g, best plant amino profile)"
    ],
    timingAdvice: "Spread total daily intake across 4 structured meals. Prioritize a leucine-dense meal 90 minutes post-training and before bed.",
    pitfall: "Drinking 80g of protein in one shake thinking it triples growth. Excess oxidation occurs when single-dose leucine thresholds are drastically exceeded.",
    proTip: "If consuming plant protein (e.g. pea/rice blend), increase serving size by 20% or pair with a high-leucine grain to match the essential amino acid score of whey."
  },
  {
    id: "fat_loss_deficit_mechanics",
    category: "cutting_fatloss",
    title: "Aggressive vs Sustainable Caloric Deficit for Fat Loss",
    shortDesc: "Preserve 99% of your lean mass while shredding body fat with an intelligent 400-500 kcal deficit.",
    badge: "Fat Loss Mastery",
    level: "All Fitness Levels",
    readTime: "5 min read",
    keyRule: "Never slash calories below 75% of your TDEE. Moderate 20-25% deficit preserves muscle glycogen and thyroid output.",
    macrosFocus: "Deficit of 400-600 kcal/day (~0.5kg loss/week)",
    summary: `Excessive crash dieting causes the body to downregulate NEAT (Non-Exercise Activity Thermogenesis), spike cortisol, downregulate leptin (satiety hormone), and metabolize lean muscle tissue. A controlled deficit combined with heavy progressive resistance training signals to the central nervous system that muscle tissue is essential for survival, forcing adipose tissue to supply the energy deficit.`,
    practicalFoods: [
      "Cruciferous Vegetables (Broccoli, Cauliflower, Zucchini - extreme satiety index)",
      "Boiled Potatoes (Highest satiety index score on the Holt satiety table)",
      "White Fish (Cod, Tilapia, Basa - high protein volume with sub-1% fat)",
      "Shirataki / Konjac Noodles or Spaghetti Squash (Under 20 kcal per serving)",
      "Berries (Strawberries, Blueberries - high fiber, low fructose impact)",
      "Psyllium Husk & Chia Seeds (Viscous soluble fiber for gut motility & fullness)"
    ],
    timingAdvice: "Place 50% of your daily carbohydrate allocation around your training window (pre and post) to preserve gym strength while operating in an overall deficit.",
    pitfall: "Cutting fats to zero. Dietary fats must remain at minimum 0.6g-0.8g per kg bodyweight to synthesize testosterone, estrogen, and cell membranes.",
    proTip: "Use diet breaks: every 6 to 8 weeks in a deep deficit, spend 7 days eating at maintenance calories. This recharges thyroid (T3/T4) and restores metabolic rate."
  },
  {
    id: "clean_hypertrophy_surplus",
    category: "clean_bulking",
    title: "Lean Bulk Architecture: The 250-350 Kcal Anabolic Surplus",
    shortDesc: "Why 'dirty bulking' creates stubborn adipocytes and how lean surplus maximizes contractile muscle tissue.",
    badge: "Muscle Growth",
    level: "Intermediate Lifter",
    readTime: "4 min read",
    keyRule: "Aim for 1.0% to 1.5% body weight gain per month for natural lifters to ensure gains are 80%+ contractile tissue.",
    macrosFocus: "TDEE + 250-350 kcal | Carbs 4-5g/kg",
    summary: `Muscle protein accretion is an energetically expensive process, but muscle tissue growth is biologically rate-limited (roughly 0.7 to 1.2 kg of pure muscle per month for trained naturals). Eating an excessive 1,000 calorie surplus doesn't speed up ribosomal translation; it merely causes lipid accumulation in visceral and subcutaneous fat depots. A slight 250-350 kcal surplus supplies all energy needed for maximum synthesis without the bloat.`,
    practicalFoods: [
      "Jasmine & Basmati Rice (Fast gastric emptying, easy to digest high carb volume)",
      "Oatmeal & Cream of Rice (Complex sustained polysaccharide release)",
      "Nut Butters & Cold-Pressed Extra Virgin Olive Oil (Calorie dense healthy monounsaturates)",
      "Whole Eggs & Grass-Fed Ghee / Butter (Fat-soluble vitamins A, D, E, K and cholesterol for androgen synthesis)",
      "Bananas & Medjool Dates (Natural glucose + potassium for intracellular hydration)"
    ],
    timingAdvice: "Consume a high-carb, moderate-protein meal 2 hours prior to lifting, followed by an electrolyte-dense intra-workout or post-workout carb reload.",
    pitfall: "Not weighing yourself consistently. Fluctuations in water and glycogen happen; take weekly moving averages rather than obsessing over day-to-day jumps.",
    proTip: "If you struggle with appetite to hit caloric targets, drink calories through a homemade clean mass shake: Oats + Whey + Banana + Peanut Butter + Almond Milk."
  },
  {
    id: "pre_workout_glycogen_pump",
    category: "pre_post_workout",
    title: "The Ultimate Pre-Workout Fueling & Vasodilation Protocol",
    shortDesc: "Maximizing muscular glycogen storage, blood flow, intracellular hydration, and neurological focus.",
    badge: "Performance Fuel",
    level: "Dedicated Enthusiast",
    readTime: "3 min read",
    keyRule: "Ingest 35-50g of easily digestible complex-to-simple carbs + 20g protein + 500ml water + 500mg sodium 60-90m prior.",
    macrosFocus: "Carbs: 0.5-0.8g/kg | Low Fat | Low Fiber Pre-Workout",
    summary: `The purpose of pre-workout nutrition is to top off circulating blood glucose, saturate intramuscular glycogen stores, and expand vascular plasma volume. Consuming high fat or excessive fibrous roughage right before training delays gastric emptying, diverting blood flow to digestion rather than skeletal muscles. Adding a pinch of Himalayan pink salt dramatically enhances the muscular pump via sodium-potassium ATPase pump activation.`,
    practicalFoods: [
      "White Toast / Sourdough with Raw Honey & Whey Protein Isolate",
      "Cream of Rice with 1 Scoop Whey and Sliced Banana",
      "Rice Cakes with Natural Honey and a Pinch of Sea Salt",
      "Watermelon / Beetroot Juice (Naturally rich in L-Citrulline & Nitrates for nitric oxide synthesis)",
      "Black Coffee / Matcha (Ergogenic caffeine 3mg-5mg/kg bodyweight taken 45 mins prior)"
    ],
    timingAdvice: "Main meal 90-120 mins before training. Optional rapid-acting carb snack (honey or banana) 20 minutes before stepping into the gym.",
    pitfall: "Eating a greasy, high-fat meal 30 minutes before heavy squats, leading to sluggish nausea and acid reflux.",
    proTip: "Dissolve 500mg of pink Himalayan sea salt in your pre-workout drink. Sodium pulls water into intramuscular compartments, creating explosive muscle fullness."
  },
  {
    id: "post_workout_anabolic_window",
    category: "pre_post_workout",
    title: "Post-Workout Recovery: Debunking the 30-Minute Myth",
    shortDesc: "What science actually says about glycogen resynthesis, cortisol blunting, and myofibrillar repair.",
    badge: "Recovery Protocol",
    level: "All Fitness Levels",
    readTime: "3 min read",
    keyRule: "The anabolic window lasts 3 to 5 hours surrounding your workout. Priority is total net protein and glycogen restock.",
    macrosFocus: "30-40g High Quality Protein + 40-70g Carbs within 2 hours",
    summary: `The old bodybuilding myth that your workout is wasted unless you gulp a shake in the locker room has been thoroughly debunked. Resistance training sensitizes skeletal muscle to amino acids for up to 24-48 hours. However, eating within 60-90 minutes post-workout halts exercise-induced muscle protein breakdown, lowers elevated cortisol, and accelerates glycogen synthase.`,
    practicalFoods: [
      "Whey Isolate or Pea/Soy Isolate blended with Frozen Blueberries and Milk",
      "Grilled Chicken Breast with White Jasmine Rice and Steamed Asparagus",
      "Scrambled Egg Whites with Whole Eggs, Sweet Potato Mash, and Avocado",
      "Tofu & Black Bean Burrito Bowl with Basmati Rice and Pico de Gallo",
      "Low-fat Skyr / Greek Yogurt with Granola and Tart Cherry Juice"
    ],
    timingAdvice: "Aim to consume a balanced whole-food meal within 60-120 minutes of concluding your workout session.",
    pitfall: "Ignoring carbs post-workout. Carbs spike insulin, which acts as a potent anti-catabolic agent by shutting down intracellular proteolysis (muscle breakdown).",
    proTip: "Tart cherry juice post-workout reduces delayed onset muscle soreness (DOMS) by reducing oxidative lipid peroxidation."
  },
  {
    id: "plant_based_complete_amino_acids",
    category: "vegetarian_vegan",
    title: "Plant-Powered Hypertrophy: Overcoming Limiting Amino Acids",
    shortDesc: "How vegetarians and vegans can build elite physique aesthetics using complementary plant proteins.",
    badge: "Plant Science",
    level: "Vegetarian / Vegan",
    readTime: "5 min read",
    keyRule: "Combine legume proteins (rich in lysine) with cereal grains (rich in methionine) to formulate complete protein matrices.",
    macrosFocus: "Plant Protein Target: 2.0g - 2.2g / kg bodyweight",
    summary: `While individual plant proteins may have slightly lower biological values (DIAAS scores) compared to dairy or animal proteins, combining diverse sources throughout the day completely neutralizes any deficit. Plant-based diets provide an abundance of anti-inflammatory polyphenols, antioxidants, and gut-healthy prebiotic fibers that improve vascular endothelial function.`,
    practicalFoods: [
      "Low-Fat Paneer / Cottage Cheese (Superb casein source for lacto-vegetarians)",
      "Soya Chunks / Textured Vegetable Protein (52g protein per 100g dry weight, ultra lean)",
      "Organic Firm Tofu & Tempeh (Rich in isoflavones, highly bioavailable)",
      "Sprouted Moong Dal / Chickpea Lentils (Rich in micronutrients, iron and folate)",
      "Pea + Brown Rice Protein Powder 70:30 Blend (Gold standard plant amino acid profile)",
      "Hemp Hearts & Pumpkin Seeds (Healthy zinc, magnesium, and omega-3 alpha-linolenic acid)"
    ],
    timingAdvice: "Due to slightly lower leucine density in single plant foods, aim for 30-38g of plant protein per sitting instead of 25g.",
    pitfall: "Relying on heavily processed commercial fake meats loaded with oxidized seed oils and artificial sodium binders.",
    proTip: "Soak and ferment beans and lentils before cooking to degrade phytic acid, boosting iron and zinc bioavailability by up to 50%."
  },
  {
    id: "evidence_based_supplements_tier",
    category: "supplements",
    title: "The Evidence-Based Supplement Tier List (Tier S to F)",
    shortDesc: "Stop wasting money on marketing hype. Here is what 500+ randomized clinical trials actually prove.",
    badge: "Clinical Evidence",
    level: "All Fitness Levels",
    readTime: "6 min read",
    keyRule: "Only invest in Tier S and Tier A compounds: Creatine Monohydrate, Whey/Plant Protein, Caffeine, and Vitamin D3/K2.",
    macrosFocus: "Creatine 5g/day daily | Vit D3 2000-4000 IU",
    summary: `The fitness supplement industry is riddled with proprietary blends and underdosed ingredients. Only a small fraction of compounds withstand rigorous meta-analyses:
    
- **Creatine Monohydrate (Tier S+)**: Replenishes intramuscular phosphocreatine pools, increasing cellular ATP yield by 5-15%. Improves power, strength, and brain neurochemistry. Take 5g every single day (timing does not matter, saturation matters).
- **Whey / Plant Protein (Tier S)**: Convenient, high-quality, cost-effective tool to hit daily protein thresholds.
- **Caffeine Anhydrous (Tier A)**: Proven adenosine antagonist, reduces RPE (rate of perceived exertion) and improves power output by 3-7%. Take 3-6mg/kg 45m pre-workout.
- **L-Citrulline Malate 2:1 (Tier A)**: 6-8g increases blood arginine levels and nitric oxide synthesis, enhancing vasodilation and metabolite clearance.
- **Beta-Alanine (Tier B)**: Buffers intramuscular hydrogen ions (carnosine), beneficial for high-rep sets (60-240 seconds duration).
- **Testosterone Boosters / Fat Burners (Tier F / Scam)**: Zero proven clinical efficacy for healthy individuals, mostly caffeine and diuretic herbs.`,
    practicalFoods: [
      "Creatine Monohydrate (100% pure Creapure or standard monohydrate)",
      "Whey Isolate or Hydrolysate for immediate rapid gastric clearance",
      "Vitamin D3 + K2 (Supports endogenous testosterone and calcium bone transport)",
      "Omega-3 Fish Oil or Algal Oil (EPA/DHA for joint lubrication and systemic inflammation)",
      "Zinc Picolinate & Magnesium Glycinate (Taken before bed for deep slow-wave REM sleep)"
    ],
    timingAdvice: "Take Creatine 5g daily with water. Take Zinc & Magnesium 45 mins before sleep. Take Caffeine 45m before lifting, avoiding after 3 PM.",
    pitfall: "Cycling on and off creatine. Creatine is not hormonal; cycling off simply depletes muscle phosphocreatine stores with zero benefit.",
    proTip: "You do not need a 20g/day creatine loading phase. Taking 5g daily will fully saturate muscle tissue in 21 to 28 days with zero gastrointestinal distress."
  },
  {
    id: "hydration_electrolytes_pump",
    category: "hydration_recovery",
    title: "Intracellular Hydration: The Lost 10% of Athletic Power",
    shortDesc: "A mere 2% drop in hydration reduces muscular force output by over 10% and spikes heart rate.",
    badge: "Recovery & Cellular Health",
    level: "Dedicated Enthusiast",
    readTime: "3 min read",
    keyRule: "Drink 40-50ml of water per kg bodyweight per day, plus 500-800ml per hour of intense sweat-inducing exercise.",
    macrosFocus: "Water: 3.5L - 4.5L daily | Sodium 3-5g | Potassium 3-4g",
    summary: `Muscles are roughly 75% water. Intracellular hydration drives cellular swelling, which triggers anabolic signaling cascades and activates glycogen synthesis. Drinking gallons of plain water without adequate sodium and potassium causes water intoxication and flushes out essential minerals, resulting in muscle cramps, brain fog, and flattened pumps.`,
    practicalFoods: [
      "Coconut Water (Nature's finest potassium & magnesium hydration fluid)",
      "Celtic / Himalayan Pink Salt (Essential sodium chloride with trace trace minerals)",
      "Lemon / Lime Juice (Alkalizing organic citrates)",
      "High Potassium Fruits (Bananas, Cantaloupe, Oranges, Kiwi)",
      "Spinach & Avocado (Electrolyte powerhouses rich in potassium and magnesium)"
    ],
    timingAdvice: "Begin your morning with 500ml room temperature water and a pinch of mineral salt. Sip intra-workout electrolytes during sessions.",
    pitfall: "Drinking plain distilled or zero-mineral water while heavily sweating, worsening hyponatremia and exercise cramps.",
    proTip: "Check your urine color: pale straw yellow is optimal. Completely clear means you are flushing out electrolytes; dark amber means severe dehydration."
  }
];
