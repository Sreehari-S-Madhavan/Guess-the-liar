let countdown = null;
let players = [];
let liarIndex = -1;
let currentPlayerIndex = 0;
let category = 'general';
let scores = {};
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || {};

const promptData = {
  anime: [
    { original: "What’s your favorite anime series of all time?", imposter: "What’s your favorite anime opening song?" },
    { original: "What’s your favorite anime genre?", imposter: "What’s your favorite anime trope within a genre?" },
    { original: "Who’s your favorite anime character?", imposter: "What’s your favorite signature move of an anime character?" },
    { original: "What’s an anime you would recommend to a beginner?", imposter: "What’s an anime you would recommend for its art style?" },
    { original: "What’s your favorite anime movie?", imposter: "What’s your favorite scene from an anime movie?" },
    { original: "What’s your favorite anime studio?", imposter: "What’s your favorite animation technique used by an anime studio?" },
    { original: "What’s a character trait you admire most in anime?", imposter: "What’s a character's hairstyle you admire most in anime?" },
    { original: "What’s your favorite classic anime?", imposter: "What’s your favorite classic anime villain?" },
    { original: "What’s the most emotional anime you’ve watched?", imposter: "What’s the most emotional soundtrack from an anime you’ve watched?" },
    { original: "What’s your favorite anime setting or world?", imposter: "What’s your favorite type of architecture in an anime setting?" },
    { original: "What’s your favorite type of power system in anime (e.g., magic, Nen)?", imposter: "What’s your favorite visual effect of a power system in anime?" },
    { original: "What’s your favorite anime food or dish depicted?", imposter: "What’s your favorite eating sound effect in anime?" },
    { original: "What’s your favorite sports anime?", imposter: "What’s your favorite specific sport depicted in anime?" },
    { original: "What’s your favorite high school anime?", imposter: "What’s your favorite school uniform design in anime?" },
    { original: "What’s your favorite underrated anime?", imposter: "What’s your favorite fan theory about an underrated anime?" },
    { original: "What’s your favorite shonen anime?", imposter: "What’s your favorite rivalry in a shonen anime?" },
    { original: "What’s your favorite slice-of-life anime?", imposter: "What’s your favorite quiet moment in a slice-of-life anime?" },
    { original: "What’s an anime series you want to see a remake of?", imposter: "What’s an anime opening you want to see a remake of?" },
    { original: "What’s your favorite voice actor in anime (Japanese or English)?", imposter: "What’s your favorite catchphrase delivered by a voice actor in anime?" },
    { original: "What’s your favorite mecha anime?", imposter: "What’s your favorite design detail on a mecha?" },
    { original: "What’s your favorite magical girl anime?", imposter: "What’s your favorite magical transformation sequence in an anime?" },
    { original: "What’s an anime character’s outfit you’d love to wear?", imposter: "What’s an anime character’s accessory you’d love to wear?" },
    { original: "What’s your favorite anime ending song?", imposter: "What’s your favorite animation sequence during an anime ending?" },
    { original: "What’s your favorite psychological thriller anime?", imposter: "What’s your favorite plot twist in a psychological thriller anime?" },
    { original: "What’s your favorite historical anime?", imposter: "What’s your favorite historical era depicted in anime?" },
    { original: "Who is your favorite anime protagonist?", imposter: "What’s your favorite anime weapon?" },
    { original: "Which anime made you cry?", imposter: "Which cartoon made you cry?" },
    { original: "What's your favorite anime villain?", imposter: "What's your favorite anime evil laugh?" },
    { original: "What's your favorite anime fight scene?", imposter: "What's your favorite anime special effect in a fight?" },
    { original: "What's your favorite anime with a strong message?", imposter: "What's your favorite philosophical concept from an anime?" },
    { original: "What's your favorite anime for its world-building?", imposter: "What's your favorite fictional currency in an anime world?" },
    { original: "What's your favorite anime character design?", imposter: "What's your favorite anime character's eye color?" },
    { original: "What's your favorite anime with a unique premise?", imposter: "What's your favorite unusual power in an anime?" },
    { original: "What's your favorite anime voice actor's range?", imposter: "What's your favorite type of vocal sound effect in anime?" },
    { original: "What's your favorite anime OVA or movie-exclusive character?", imposter: "What's your favorite outfit of an anime OVA character?" },
    { original: "What's your favorite anime for its humor?", imposter: "What's your favorite gag sound effect in an anime comedy?" },
    { original: "What's your favorite anime for its animation quality?", imposter: "What's your favorite frame-rate choice in anime animation?" },
    { original: "What's your favorite anime character's backstory?", imposter: "What's your favorite specific childhood memory of an anime character?" },
    { original: "What's your favorite anime transformation?", imposter: "What's your favorite sound effect during an anime transformation?" },
    { original: "What's your favorite anime art style for backgrounds?", imposter: "What's your favorite specific brushstroke texture in anime backgrounds?" },
    { original: "What's your favorite anime ending scene?", imposter: "What's your favorite final piece of dialogue in an anime ending?" },
    { original: "What's your favorite anime based on a manga?", imposter: "What's your favorite panel layout in an anime's source manga?" },
    { original: "What's your favorite anime from the 90s?", imposter: "What's your favorite specific pixel animation from a 90s anime?" },
    { original: "What's your favorite anime from the 2000s?", imposter: "What's your favorite fashion trend depicted in a 2000s anime?" },
    { original: "What's your favorite ongoing anime?", imposter: "What's your favorite current plot theory for an ongoing anime?" },
    { original: "What's your favorite anime with a unique soundtrack instrument?", imposter: "What's your favorite specific sound of that unique instrument in an anime soundtrack?" },
    { original: "What's your favorite anime opening sequence for choreography?", imposter: "What's your favorite specific dance move in an anime opening?" },
    { original: "What's your favorite anime for character development?", imposter: "What's your favorite moment of an anime character's realization?" },
    { original: "What's your favorite anime battle soundtrack?", imposter: "What's your favorite specific drum beat in an anime battle soundtrack?" },
    { original: "What's your favorite anime about sports?", imposter: "What's your favorite specific score count in a sports anime match?" },
    { original: "What's your favorite anime's cultural impact?", imposter: "What's your favorite specific meme derived from an anime's cultural impact?" }
  ],
  movies: [
    { original: "What’s your favorite movie of all time?", imposter: "What’s your favorite director of a movie?" },
    { original: "What’s your favorite movie genre?", imposter: "What’s your favorite sub-genre of movies?" },
    { original: "Who’s your favorite actor/actress?", imposter: "What’s your favorite performance by an actor/actress?" },
    { original: "What’s a movie you can watch repeatedly?", imposter: "What’s your favorite quote from a movie you can watch repeatedly?" },
    { original: "What’s your favorite movie soundtrack?", imposter: "What’s your favorite individual song from a movie soundtrack?" },
    { original: "What’s your favorite movie ending?", imposter: "What’s your favorite closing shot of a movie?" },
    { original: "What’s your favorite villain in a movie?", imposter: "What’s your favorite villain's monologue in a movie?" },
    { original: "What’s a movie that made you cry?", imposter: "What’s a specific scene in a movie that made you cry?" },
    { original: "What’s your favorite comedy movie?", imposter: "What’s your favorite comedic actor in a movie?" },
    { original: "What’s your favorite action movie?", imposter: "What’s your favorite fight scene in an action movie?" },
    { original: "What’s your favorite sci-fi movie?", imposter: "What’s your favorite futuristic gadget from a sci-fi movie?" },
    { original: "What’s your favorite horror movie?", imposter: "What’s your favorite jump scare in a horror movie?" },
    { original: "What’s your favorite animated movie?", imposter: "What’s your favorite character design from an animated movie?" },
    { original: "What’s your favorite historical movie?", imposter: "What’s your favorite costume design from a historical movie?" },
    { original: "What’s your favorite movie quote?", imposter: "What’s your favorite character who delivers a movie quote?" },
    { original: "What’s a movie you think everyone should see?", imposter: "What’s a movie everyone should see for its cinematography?" },
    { original: "What’s your favorite superhero movie?", imposter: "What’s your favorite superpower depicted in a movie?" },
    { original: "What’s your favorite movie directed by Christopher Nolan?", imposter: "What’s your favorite mind-bending plot device in a Christopher Nolan movie?" },
    { original: "What’s your favorite romantic comedy?", imposter: "What’s your favorite meet-cute scene in a romantic comedy?" },
    { original: "What’s your favorite mystery/thriller movie?", imposter: "What’s your favorite plot twist in a mystery/thriller movie?" },
    { original: "What’s your favorite musical movie?", imposter: "What’s your favorite musical number in a movie?" },
    { original: "What’s your favorite coming-of-age movie?", imposter: "What’s your favorite high school clique depicted in a coming-of-age movie?" },
    { original: "What’s a movie with the best special effects you've seen?", imposter: "What’s a specific creature or effect from a movie with great special effects?" },
    { original: "What’s your favorite Christmas movie?", imposter: "What’s your favorite song from a Christmas movie?" },
    { original: "What’s your favorite movie setting?", imposter: "What’s your favorite iconic building from a movie setting?" },
    { original: "What's your favorite director?", imposter: "What's your favorite directorial cameo in a movie?" },
    { original: "What's your favorite movie quote?", imposter: "What's your favorite character to say a movie quote?" },
    { original: "What's your favorite movie score?", imposter: "What's your favorite instrument featured in a movie score?" },
    { original: "What's your favorite movie with a twist?", imposter: "What's your favorite subtle clue that hints at a movie twist?" },
    { original: "What's your favorite movie for re-watchability?", imposter: "What's your favorite line you discover on a re-watch?" },
    { original: "What's your favorite historical movie?", imposter: "What's your favorite historical inaccuracy in a movie?" },
    { original: "What's your favorite action movie sequence?", imposter: "What's your favorite sound effect in an action movie sequence?" },
    { original: "What's your favorite movie poster?", imposter: "What's your favorite font used on a movie poster?" },
    { original: "What's your favorite movie antagonist?", imposter: "What's your favorite specific motivation of a movie antagonist?" },
    { original: "What's your favorite use of slow motion in a movie?", imposter: "What's your favorite object caught in slow motion in a movie?" },
    { original: "What's your favorite movie for its visual effects?", imposter: "What's your favorite specific creature created with visual effects in a movie?" },
    { original: "What's your favorite movie based on a true story?", imposter: "What's your favorite real-life person portrayed in a true story movie?" },
    { original: "What's your favorite movie that won an Oscar for Best Picture?", imposter: "What's your favorite acceptance speech for a Best Picture Oscar?" },
    { original: "What's your favorite independent film?", imposter: "What's your favorite low-budget effect in an independent film?" },
    { original: "What's your favorite movie monologue?", imposter: "What's your favorite pause during a movie monologue?" },
    { original: "What's your favorite movie production company?", imposter: "What's your favorite logo animation of a movie production company?" },
    { original: "What's your favorite foreign language film?", imposter: "What's your favorite specific subtitle font in a foreign language film?" },
    { original: "What's your favorite movie character costume?", imposter: "What's your favorite fabric detail on a movie character costume?" },
    { original: "What's your favorite movie opening scene?", imposter: "What's your favorite piece of background music in a movie opening scene?" },
    { original: "What's your favorite movie with a memorable ending?", imposter: "What's your favorite specific prop featured in a memorable movie ending?" },
    { original: "What's your favorite movie about time travel?", imposter: "What's your favorite paradox explored in a time travel movie?" },
    { original: "What's your favorite movie about artificial intelligence?", imposter: "What's your favorite voice modulation of an AI character in a movie?" },
    { original: "What's your favorite movie to watch during a specific holiday?", imposter: "What's your favorite snack to eat while watching a holiday movie?" },
    { original: "What's your favorite movie set in space?", imposter: "What's your favorite planet or celestial body depicted in a space movie?" },
    { original: "What's your favorite movie adaptation of a book?", imposter: "What's your favorite detail that was changed from the book in a movie adaptation?" },
    { original: "What's your favorite Malayalam movie of all time?", imposter: "What’s your favorite dialogue from a Malayalam movie?" },
    { original: "Who’s your favorite Malayalam actor?", imposter: "What’s your favorite character played by that Malayalam actor?" }
  ],
  series: [
    { original: "Which series had the best ending?", imposter: "Which series had the best intro?" },
    { original: "Who's your favorite series character?", imposter: "Who's your favorite villain from any media?" },
    { original: "What’s your favorite TV series of all time?", imposter: "What’s your favorite TV series opening credits sequence?" },
    { original: "What’s your favorite TV series genre?", imposter: "What’s your favorite specific plot device in a TV series genre?" },
    { original: "Who’s your favorite TV series showrunner?", imposter: "What’s your favorite directorial choice by a TV series showrunner?" },
    { original: "What’s a TV series you can binge-watch repeatedly?", imposter: "What’s your favorite background music from a binge-watchable TV series?" },
    { original: "What’s your favorite TV series finale?", imposter: "What’s your favorite final line of dialogue in a TV series finale?" },
    { original: "What’s your favorite TV series villain?", imposter: "What’s your favorite specific catchphrase of a TV series villain?" },
    { original: "What’s a TV series that made you laugh the most?", imposter: "What’s your favorite specific comedic timing in a TV series?" },
    { original: "What’s your favorite TV series for its plot twists?", imposter: "What’s your favorite subtle clue that hinted at a TV series plot twist?" },
    { original: "What’s your favorite TV series setting or location?", imposter: "What’s your favorite specific prop from a TV series setting?" },
    { original: "What’s your favorite animated TV series?", imposter: "What’s your favorite specific animation style in an animated TV series?" },
    { original: "What’s your favorite historical drama series?", imposter: "What’s your favorite specific costume from a historical drama series?" },
    { original: "What’s your favorite TV series soundtrack?", imposter: "What’s your favorite specific song from a TV series soundtrack?" },
    { original: "What’s your favorite TV series quote?", imposter: "What’s your favorite specific character who delivers a TV series quote?" },
    { original: "What’s a TV series everyone should watch?", imposter: "What’s a specific theme in a TV series everyone should watch?" },
    { original: "What’s your favorite sci-fi TV series?", imposter: "What’s your favorite futuristic technology depicted in a sci-fi TV series?" },
    { original: "What’s your favorite fantasy TV series?", imposter: "What’s your favorite magical creature from a fantasy TV series?" },
    { original: "What’s your favorite mystery TV series?", imposter: "What’s your favorite specific red herring in a mystery TV series?" },
    { original: "What’s your favorite true crime documentary series?", imposter: "What’s your favorite specific piece of evidence discussed in a true crime series?" },
    { original: "What’s your favorite reality TV series?", imposter: "What’s your favorite specific moment of manufactured drama in a reality TV series?" },
    { original: "What’s your favorite superhero TV series?", imposter: "What’s your favorite specific power display in a superhero TV series?" },
    { original: "What’s your favorite medical drama series?", imposter: "What’s your favorite specific medical instrument shown in a medical drama series?" },
    { original: "What’s your favorite legal drama series?", imposter: "What’s your favorite specific courtroom monologue in a legal drama series?" },
    { original: "What’s your favorite sitcom?", imposter: "What’s your favorite specific recurring gag in a sitcom?" },
    { original: "What’s your favorite horror TV series?", imposter: "What’s your favorite specific creature design in a horror TV series?" },
    { original: "What’s your favorite show from your childhood?", imposter: "What’s your favorite specific character voice from a childhood show?" },
    { original: "What’s your favorite limited series?", imposter: "What’s your favorite specific episode from a limited series?" },
    { original: "What’s your favorite show for character development?", imposter: "What’s your favorite specific character arc moment in a show?" },
    { original: "What’s your favorite show for its dialogue?", imposter: "What’s your favorite specific rapid-fire exchange of dialogue in a show?" },
    { original: "What’s your favorite show that addresses social issues?", imposter: "What’s your favorite specific argument presented on a social issue in a show?" },
    { original: "What’s your favorite musical TV series?", imposter: "What’s your favorite specific song-and-dance number in a musical TV series?" },
    { original: "What’s your favorite sci-fi anthology series?", imposter: "What’s your favorite specific episode concept from a sci-fi anthology?" },
    { original: "What’s your favorite historical docu-series?", imposter: "What’s your favorite specific archival footage clip from a historical docu-series?" },
    { original: "What’s your favorite show with a strong female lead?", imposter: "What’s your favorite specific empowering line from a strong female lead in a show?" },
    { original: "What’s your favorite show for its cinematography?", imposter: "What’s your favorite specific camera angle in a show's cinematography?" },
    { original: "What’s your favorite show for its sound design?", imposter: "What’s your favorite specific ambient sound in a show's sound design?" },
    { original: "What’s your favorite show with a passionate fanbase?", imposter: "What’s your favorite specific fan theory from a show's fanbase?" },
    { original: "What’s your favorite spin-off series?", imposter: "What’s your favorite specific returning character in a spin-off series?" },
    { original: "What’s your favorite show with unexpected twists?", imposter: "What’s your favorite specific moment of realization from an unexpected twist in a show?" },
    { original: "What’s your favorite show that tackles complex themes?", imposter: "What’s your favorite specific philosophical debate explored in a show?" },
    { original: "What’s your favorite show with a unique visual style?", imposter: "What’s your favorite specific color palette used in a show's visual style?" },
    { original: "What’s your favorite show to rewatch with friends?", imposter: "What’s your favorite specific shared inside joke from rewatching a show with friends?" },
    { original: "What’s your favorite adaptation of a book series into a TV series?", imposter: "What’s your favorite specific detail from the book series that was included in the TV adaptation?" },
    { original: "What’s your favorite show for its ensemble cast?", imposter: "What’s your favorite specific chemistry between two actors in an ensemble cast?" },
    { original: "What’s your favorite show that got cancelled too soon?", imposter: "What’s your favorite unresolved plotline from a cancelled show?" },
    { original: "What’s your favorite show that improved over seasons?", imposter: "What’s your favorite specific character redesign in a show that improved?" },
    { original: "What’s your favorite show for its opening scene?", imposter: "What’s your favorite specific piece of music in a show's opening scene?" },
    { original: "What’s your favorite comfort show?", imposter: "What’s your favorite specific ritual you have when watching your comfort show?" }
  ],
  general: [
    { original: "What’s your favorite type of food?", imposter: "What’s your favorite fruit?" },
    { original: "What’s your go-to meal when you’re hungry?", imposter: "What’s your go-to sauce for that meal?" },
    { original: "What’s your favorite dessert?", imposter: "What’s your favorite flavor of ice cream?" },
    { original: "What’s your favorite cuisine to eat out?", imposter: "What’s your favorite dish from that cuisine?" },
    { original: "What’s your favorite breakfast food?", imposter: "What’s your favorite way to cook eggs for breakfast?" },
    { original: "What’s your favorite vegetable?", imposter: "What’s your favorite way to prepare that vegetable?" },
    { original: "What’s your favorite comfort food?", imposter: "What’s your favorite ingredient in your comfort food?" },
    { original: "What’s your favorite type of bread?", imposter: "What’s your favorite type of toast topping?" },
    { original: "What’s your favorite soup?", imposter: "What’s your favorite garnish for a soup?" },
    { original: "What’s your favorite type of cheese?", imposter: "What’s your favorite cracker to eat with cheese?" },
    { original: "What’s your favorite pizza topping?", imposter: "What’s your favorite crust type for pizza?" },
    { original: "What’s your favorite fast food item?", imposter: "What’s your favorite sauce for a fast food item?" },
    { original: "What’s your favorite hot drink?", imposter: "What’s your favorite mug for a hot drink?" },
    { original: "What’s your favorite cold drink?", imposter: "What’s your favorite type of ice in a cold drink?" },
    { original: "What’s your favorite spice to cook with?", imposter: "What’s your favorite aroma from a spice?" },
    { original: "What’s your favorite hobby?", imposter: "What’s your favorite part of your hobby?" },
    { original: "What’s a new hobby you’d like to try?", imposter: "What’s a new tool you’d need for a hobby you’d like to try?" },
    { original: "What’s your favorite creative hobby?", imposter: "What’s your favorite medium for a creative hobby?" },
    { original: "What’s your favorite active hobby?", imposter: "What’s your favorite gear for an active hobby?" },
    { original: "What’s your favorite indoor hobby?", imposter: "What’s your favorite background music for an indoor hobby?" },
    { original: "What’s your favorite outdoor hobby?", imposter: "What’s your favorite type of weather for an outdoor hobby?" },
    { original: "What’s your favorite hobby that involves collecting?", imposter: "What’s your favorite item you’ve collected in your hobby?" },
    { original: "What’s a hobby that helps you relax?", imposter: "What’s a specific sound associated with your relaxing hobby?" },
    { original: "What’s your favorite hobby to do with friends?", imposter: "What’s your favorite snack to have while doing your hobby with friends?" },
    { original: "What’s your favorite hobby that involves learning?", imposter: "What’s your favorite book or resource for that learning hobby?" },
    { original: "What’s your favorite video game genre?", imposter: "What’s your favorite specific sub-genre of video games?" },
    { original: "What’s your favorite video game of all time?", imposter: "What’s your favorite level in that video game?" },
    { original: "Who’s your favorite video game character?", imposter: "What’s your favorite specific ability of that video game character?" },
    { original: "What’s your favorite gaming platform?", imposter: "What’s your favorite controller design for that gaming platform?" },
    { original: "What’s your favorite multiplayer video game?", imposter: "What’s your favorite game mode in a multiplayer video game?" },
    { original: "What’s your favorite single-player video game?", imposter: "What’s your favorite narrative choice in a single-player video game?" },
    { original: "What’s your favorite video game soundtrack?", imposter: "What’s your favorite specific track from a video game soundtrack?" },
    { original: "What’s your favorite video game villain?", imposter: "What’s your favorite specific boss battle strategy against a video game villain?" },
    { original: "What’s your favorite indie video game?", imposter: "What’s your favorite unique art style in an indie video game?" },
    { original: "What’s your favorite sports video game?", imposter: "What’s your favorite specific commentary line in a sports video game?" },
    { original: "What’s your favorite sport to play?", imposter: "What’s your favorite specific drill in that sport?" },
    { original: "What’s your favorite sport to watch live?", imposter: "What’s your favorite fan chant at a live sport event?" },
    { original: "What’s your favorite team sport?", imposter: "What’s your favorite position in a team sport?" },
    { original: "What’s your favorite individual sport?", imposter: "What’s your favorite specific strategy in an individual sport?" },
    { original: "What’s your favorite type of athletic gear?", imposter: "What’s your favorite brand of athletic socks?" },
    { original: "What’s your favorite major sports league?", imposter: "What’s your favorite specific team in a major sports league?" },
    { original: "What’s your favorite Olympic sport to watch?", imposter: "What’s your favorite specific moment during an Olympic event?" },
    { original: "What’s your favorite type of race?", imposter: "What’s your favorite starting line sound in a race?" },
    { original: "What’s your favorite combat sport?", imposter: "What’s your favorite specific technique in a combat sport?" },
    { original: "What’s your favorite water sport?", imposter: "What’s your favorite specific type of flotation device for a water sport?" },
    { original: "What’s your ideal vacation destination?", imposter: "What’s your dream job?" },
    { original: "What’s your favorite type of vehicle?", imposter: "What’s your favorite car color?" },
    { original: "What’s your favorite book genre?", imposter: "What’s your favorite fictional character from a book?" },
    { original: "What’s your favorite musical artist?", imposter: "What’s your favorite song by that artist?" },
    { original: "What’s your favorite holiday?", imposter: "What’s your favorite holiday tradition?" },
    { original: "What’s your favorite animal?", imposter: "What’s your favorite sound that animal makes?" },
  ],
superheroes: [
    { original: "Who is your favorite superhero?", imposter: "What’s your favorite superpower?" },
    { original: "What's your favorite superhero movie?", imposter: "What's your favorite superhero movie villain?" },
    { original: "What's your favorite comic book series?", imposter: "What's your favorite comic book artist?" },
    { original: "If you had a superpower, what would it be?", imposter: "If you had a superpower, what would be its secret weakness?" },
    { original: "What's your favorite superhero team?", imposter: "What's your favorite headquarters of a superhero team?" },
    { original: "Who's your favorite superhero sidekick?", imposter: "What's your favorite superhero sidekick's costume detail?" },
    { original: "What's your favorite superhero origin story?", imposter: "What's your favorite specific moment in a superhero origin story?" },
    { original: "What's your favorite superhero costume?", imposter: "What's your favorite specific utility belt gadget on a superhero costume?" },
    { original: "Who's your favorite superhero with a tragic past?", imposter: "What's your favorite specific color associated with a superhero's tragic past?" },
    { original: "What's your favorite superhero's arch-nemesis?", imposter: "What's your favorite evil laugh of a superhero's arch-nemesis?" },
    { original: "What's your favorite superhero TV show?", imposter: "What's your favorite opening sequence of a superhero TV show?" },
    { original: "What's your favorite superpower combination?", imposter: "What's your favorite specific sound effect of a combined superpower?" },
    { original: "What's your favorite superhero gadget?", imposter: "What's your favorite specific button on a superhero gadget?" },
    { original: "Who's your favorite superhero without superpowers?", imposter: "What's your favorite specific training montage for a superhero without superpowers?" },
    { original: "What's your favorite city protected by superheroes?", imposter: "What's your favorite specific landmark in a superhero-protected city?" },
    { original: "What's your favorite superhero catchphrase?", imposter: "What's your favorite specific vocal inflection when a superhero says their catchphrase?" },
    { original: "What's your favorite superhero vehicle?", imposter: "What's your favorite specific propulsion sound of a superhero vehicle?" },
    { original: "What's your favorite superhero secret identity?", imposter: "What's your favorite mundane job of a superhero's secret identity?" },
    { original: "What's your favorite superhero with a dark side?", imposter: "What's your favorite specific moral dilemma faced by a superhero with a dark side?" },
    { original: "What's your favorite superhero saga/storyline?", imposter: "What's your favorite specific panel from a superhero saga?" },
    { original: "What's your favorite superhero that uses magic?", imposter: "What's your favorite specific incantation used by a magic-wielding superhero?" },
    { original: "What's your favorite superhero that's an alien?", imposter: "What's your favorite specific planet of origin for an alien superhero?" },
    { original: "What's your favorite superhero redemption arc?", imposter: "What's your favorite specific sacrifice made during a superhero redemption arc?" },
    { original: "What's your favorite superhero's iconic pose?", imposter: "What's your favorite specific angle of a superhero's iconic pose?" },
    { original: "What's your favorite superhero comic book publisher?", imposter: "What's your favorite specific logo design of a superhero comic book publisher?" },
    { original: "What's your favorite superpower for everyday life?", imposter: "What's your favorite mundane task to use an everyday superpower for?" },
    { original: "What's your favorite type of superhero fan art?", imposter: "What's your favorite specific art style in superhero fan art?" },
    { original: "What's your favorite superhero movie director?", imposter: "What's your favorite specific camera shot by a superhero movie director?" },
    { original: "What's your favorite superhero who uses technology?", imposter: "What's your favorite specific sound of a gadget activating for a tech-based superhero?" },
    { original: "What's your favorite superhero who leads a team?", imposter: "What's your favorite specific strategy used by a superhero team leader?" },
    { original: "What's your favorite superhero movie ending scene?", imposter: "What's your favorite specific post-credits scene of a superhero movie?" },
    { original: "What's your favorite superhero with a unique fighting style?", imposter: "What's your favorite specific signature move within a unique superhero fighting style?" },
    { original: "What's your favorite superhero inspired by mythology?", imposter: "What's your favorite specific mythological creature connected to a superhero?" },
    { original: "What's your favorite superhero who's a genius?", imposter: "What's your favorite specific invention created by a genius superhero?" },
    { original: "What's your favorite superhero vehicle chase scene?", imposter: "What's your favorite specific explosion sound in a superhero vehicle chase?" },
    { original: "What's your favorite superhero who protects a specific city?", imposter: "What's your favorite specific rooftop view of a superhero-protected city?" },
    { original: "What's your favorite superpower with a humorous downside?", imposter: "What's your favorite specific comical mishap caused by a humorous superpower downside?" },
    { original: "What's your favorite superhero with a unique moral code?", imposter: "What's your favorite specific ethical dilemma faced by a superhero with a unique moral code?" },
    { original: "What's your favorite superhero animated series?", imposter: "What's your favorite specific character voice in a superhero animated series?" },
    { original: "What's your favorite superhero crossover event?", imposter: "What's your favorite specific panel depicting a hero team-up in a crossover event?" },
    { original: "What's your favorite superhero who's a mentor?", imposter: "What's your favorite specific piece of advice given by a superhero mentor?" },
    { original: "What's your favorite superhero with an iconic weapon?", imposter: "What's your favorite specific sound of a superhero's iconic weapon activating?" },
    { original: "What's your favorite superhero origin in the modern era?", imposter: "What's your favorite specific tech gadget introduced in a modern superhero origin?" },
    { original: "What's your favorite superhero who operates in the shadows?", imposter: "What's your favorite specific silhouette of a stealthy superhero?" },
    { original: "What's your favorite superhero with a strong supporting cast?", imposter: "What's your favorite specific non-powered character in a superhero's supporting cast?" },
    { original: "What's your favorite superhero who deals with cosmic threats?", imposter: "What's your favorite specific celestial body threatened by a cosmic superhero villain?" },
    { original: "What's your favorite superhero who works for an organization?", imposter: "What's your favorite specific logo design of a superhero organization?" },
    { original: "What's your favorite superhero's iconic battle cry?", imposter: "What's your favorite specific echo of a superhero's battle cry?" },
    { original: "What's your favorite superhero that can fly?", imposter: "What's your favorite specific angle of a flying superhero against the sky?" },
    { original: "What's your favorite superhero for their resilience?", imposter: "What's your favorite specific healing sound effect of a resilient superhero?" }
  ],
  popular_games: [ // Non-video games (board games, card games, party games, traditional games)
    { original: "What’s your favorite board game?", imposter: "What’s your favorite board game piece?" },
    { original: "What’s your favorite card game?", imposter: "What’s your favorite card design in a card game?" },
    { original: "What’s your favorite party game?", imposter: "What’s your favorite specific rule twist in a party game?" },
    { original: "What’s your favorite classic tabletop game?", imposter: "What’s your favorite specific sound of dice rolling in a classic tabletop game?" },
    { original: "What’s your favorite puzzle (e.g., jigsaw, Rubik's Cube)?", imposter: "What’s your favorite specific texture of a puzzle piece?" },
    { original: "What’s your favorite outdoor game to play with friends?", imposter: "What’s your favorite specific sound of a ball hitting something in an outdoor game?" },
    { original: "What’s your favorite game to play with family?", imposter: "What’s your favorite specific family inside joke from playing a game?" },
    { original: "What’s your favorite strategy game?", imposter: "What’s your favorite specific opening move in a strategy game?" },
    { original: "What’s your favorite game that involves drawing?", imposter: "What’s your favorite specific crayon color used in a drawing game?" },
    { original: "What’s your favorite word game?", imposter: "What’s your favorite specific letter tile in a word game?" },
    { original: "What’s your favorite game that involves bluffing?", imposter: "What’s your favorite specific tell of a player bluffing in a game?" },
    { original: "What’s your favorite cooperative board game?", imposter: "What’s your favorite specific player token in a cooperative board game?" },
    { original: "What’s your favorite game for a large group?", imposter: "What’s your favorite specific laughter sound from a large group game?" },
    { original: "What’s your favorite dexterity game?", imposter: "What’s your favorite specific wobbling sound of a piece in a dexterity game?" },
    { original: "What’s your favorite game to play on a rainy day?", imposter: "What’s your favorite specific type of snack to eat during a rainy day game?" },
    { original: "What’s your favorite role-playing tabletop game?", imposter: "What’s your favorite specific sound effect used by a Game Master in an RPG?" },
    { original: "What’s your favorite game for quick play?", imposter: "What’s your favorite specific sound of a timer running out in a quick game?" },
    { original: "What’s your favorite game with a unique theme?", imposter: "What’s your favorite specific icon from a game with a unique theme?" },
    { original: "What’s your favorite trivia game?", imposter: "What’s your favorite specific category of questions in a trivia game?" },
    { original: "What’s your favorite game that involves deduction?", imposter: "What’s your favorite specific clue card in a deduction game?" },
    { original: "What’s your favorite game with a strong narrative?", imposter: "What’s your favorite specific character backstory in a narrative game?" },
    { original: "What’s your favorite game to introduce to new players?", imposter: "What's your favorite specific rule to explain first when introducing a game?" },
    { original: "What’s your favorite game with expansions?", imposter: "What's your favorite specific new component from a game expansion?" },
    { original: "What’s your favorite game for its art style?", imposter: "What's your favorite specific detail in the illustrations of a game's art style?" },
    { original: "What’s your favorite game that uses miniatures?", imposter: "What's your favorite specific paint color on a game miniature?" },
    { original: "What's your favorite game with a unique scoring system?", imposter: "What's your favorite specific symbol used in a unique game scoring system?" },
    { original: "What's your favorite game for its replayability?", imposter: "What's your favorite specific variable setup for replayability in a game?" },
    { original: "What's your favorite game for creative problem-solving?", imposter: "What's your favorite specific type of challenge in a creative problem-solving game?" },
    { original: "What's your favorite game with a surprising twist?", imposter: "What's your favorite specific reveal card in a game with a surprising twist?" },
    { original: "What's your favorite party game that gets everyone laughing?", imposter: "What's your favorite specific sound of collective laughter from a party game?" },
    { original: "What's your favorite game that involves building?", imposter: "What's your favorite specific shape of a building piece in a game?" },
    { original: "What's your favorite game for strategic thinking?", imposter: "What's your favorite specific complex decision point in a strategic game?" },
    { original: "What's your favorite game with a unique component?", imposter: "What's your favorite specific texture of a unique game component?" },
    { original: "What's your favorite game that involves storytelling?", imposter: "What's your favorite specific narrative prompt in a storytelling game?" },
    { original: "What's your favorite game for two players?", imposter: "What's your favorite specific head-to-head interaction in a two-player game?" },
    { original: "What's your favorite game that uses dice?", imposter: "What's your favorite specific number to roll on a dice in a game?" },
    { original: "What's your favorite game that uses cards for actions?", imposter: "What's your favorite specific icon on an action card in a game?" },
    { original: "What's your favorite game for its historical context?", imposter: "What's your favorite specific historical fact learned from a game?" },
    { original: "What's your favorite game that simulates real life?", imposter: "What's your favorite specific decision point in a real-life simulation game?" },
    { original: "What's your favorite game with a hidden traitor mechanic?", imposter: "What's your favorite specific moment of suspicion in a hidden traitor game?" },
    { original: "What's your favorite game that uses legacy mechanics?", imposter: "What's your favorite specific sticker to place on a legacy game board?" },
    { original: "What's your favorite game for its humor?", imposter: "What's your favorite specific witty text on a game card?" },
    { original: "What's your favorite abstract strategy game?", imposter: "What's your favorite specific geometric pattern in an abstract strategy game?" },
    { original: "What's your favorite game for its tactile experience?", imposter: "What's your favorite specific sound of shuffling cards in a tactile game?" },
    { original: "What's your favorite game that involves role-playing?", imposter: "What's your favorite specific character voice you put on when role-playing in a game?" },
    { original: "What's your favorite game that has a digital adaptation?", imposter: "What's your favorite specific user interface sound in a digital game adaptation?" },
    { original: "What's your favorite game for its simple rules?", imposter: "What's your favorite specific introductory sentence in a simple game's rulebook?" },
    { original: "What's your favorite game that involves a timer?", imposter: "What's your favorite specific sound of a timer counting down in a game?" },
    { original: "What's your favorite game that involves voting?", imposter: "What's your favorite specific emoji to use for voting in a game?" },
    { original: "What's your favorite game that encourages negotiation?", imposter: "What's your favorite specific phrase used during negotiation in a game?" }
  ],
  video_games: [ // Adding 50 new ones to the existing pool
    { original: "What’s your favorite video game genre?", imposter: "What’s your favorite specific sub-genre of video games?" },
    { original: "What’s your favorite video game of all time?", imposter: "What’s your favorite level in that video game?" },
    { original: "Who’s your favorite video game character?", imposter: "What’s your favorite specific ability of that video game character?" },
    { original: "What’s your favorite gaming platform?", imposter: "What’s your favorite controller design for that gaming platform?" },
    { original: "What’s your favorite multiplayer video game?", imposter: "What’s your favorite game mode in a multiplayer video game?" },
    { original: "What’s your favorite single-player video game?", imposter: "What’s your favorite narrative choice in a single-player video game?" },
    { original: "What’s your favorite video game soundtrack?", imposter: "What’s your favorite specific track from a video game soundtrack?" },
    { original: "What’s your favorite video game villain?", imposter: "What’s your favorite specific boss battle strategy against a video game villain?" },
    { original: "What’s your favorite indie video game?", imposter: "What’s your favorite unique art style in an indie video game?" },
    { original: "What’s your favorite sports video game?", imposter: "What’s your favorite specific commentary line in a sports video game?" },
    { original: "What’s your favorite racing video game?", imposter: "What’s your favorite specific car model in a racing video game?" },
    { original: "What’s your favorite puzzle video game?", imposter: "What’s your favorite specific mechanic in a puzzle video game?" },
    { original: "What’s your favorite horror video game?", imposter: "What’s your favorite jump scare sound in a horror video game?" },
    { original: "What’s your favorite RPG (Role-Playing Game)?", imposter: "What’s your favorite specific class or role in an RPG?" },
    { original: "What’s your favorite simulation video game?", imposter: "What’s your favorite specific detail to manage in a simulation game?" },
    { original: "What’s your favorite strategy video game?", imposter: "What’s your favorite opening move in a strategy video game?" },
    { original: "What’s your favorite open-world video game?", imposter: "What’s your favorite type of hidden collectible in an open-world game?" },
    { original: "What’s your favorite educational video game?", imposter: "What’s your favorite specific fact learned from an educational video game?" },
    { original: "What’s your favorite mobile game?", imposter: "What’s your favorite specific gesture control in a mobile game?" },
    { original: "What’s your favorite VR game?", imposter: "What’s your favorite sensation of interaction in a VR game?" },
    { original: "What’s your favorite video game with a strong story?", imposter: "What’s your favorite specific plot twist in a video game story?" },
    { original: "What’s your favorite video game art style?", imposter: "What’s your favorite specific color palette used in a video game art style?" },
    { original: "What’s your favorite video game sound effect?", imposter: "What’s your favorite specific sound effect for a critical hit in a video game?" },
    { original: "What’s your favorite video game weapon?", imposter: "What’s your favorite specific reload animation of a video game weapon?" },
    { original: "What’s your favorite video game environment?", imposter: "What’s your favorite specific hidden detail in a video game environment?" },
    { original: "What’s your favorite video game moment (e.g., iconic scene)?", imposter: "What’s your favorite piece of background music during an iconic video game moment?" },
    { original: "What’s your favorite way to customize your character in a video game?", imposter: "What’s your favorite specific accessory for character customization?" },
    { original: "What’s your favorite video game achievement/trophy?", imposter: "What’s the hardest video game achievement you've earned?" },
    { original: "What’s your favorite video game series?", imposter: "What’s your favorite spin-off game from a video game series?" },
    { original: "What’s your favorite type of game currency in video games?", imposter: "What’s your favorite specific sound effect when earning in-game currency?" },
    { original: "What’s your favorite video game that blends genres?", imposter: "What’s your favorite unexpected genre combination in a video game?" },
    { original: "What’s your favorite video game boss fight?", imposter: "What’s your favorite specific phase transition in a video game boss fight?" },
    { original: "What’s your favorite video game with a memorable tutorial?", imposter: "What’s your favorite specific tip given in a video game tutorial?" },
    { original: "What’s your favorite gaming community?", imposter: "What’s your favorite specific inside joke within a gaming community?" },
    { original: "What’s your favorite type of game ending?", imposter: "What’s your favorite specific post-credits scene in a video game?" },
    { original: "What’s your favorite video game item or power-up?", imposter: "What’s your favorite sound effect when picking up a video game item?" },
    { original: "What’s your favorite retro video game?", imposter: "What’s your favorite specific pixel art detail in a retro video game?" },
    { original: "What’s your favorite video game about exploration?", imposter: "What’s your favorite type of hidden passage in an exploration game?" },
    { original: "What’s your favorite video game with a strong protagonist?", imposter: "What’s your favorite specific line delivered by a strong video game protagonist?" },
    { original: "What’s your favorite video game that you play to relax?", imposter: "What’s your favorite ambient sound in a relaxing video game?" },
    { original: "What’s your favorite video game related to a movie/TV franchise?", imposter: "What’s your favorite specific character detail from the original franchise adapted into a video game?" },
    { original: "What’s your favorite video game with unique gameplay mechanics?", imposter: "What’s your favorite specific input method for unique gameplay?" },
    { original: "What’s your favorite video game level design?", imposter: "What’s your favorite hidden shortcut in a video game level?" },
    { original: "What’s your favorite video game publisher/developer?", imposter: "What’s your favorite specific design philosophy of a video game developer?" },
    { original: "What’s your favorite video game character design?", imposter: "What’s your favorite specific accessory on a video game character design?" },
    { original: "What’s your favorite video game intro sequence?", imposter: "What’s your favorite specific piece of animation in a video game intro?" },
    { original: "What’s your favorite video game challenge?", imposter: "What’s your favorite specific condition for a video game challenge?" },
    { original: "What’s your favorite video game with a strong community?", imposter: "What’s your favorite specific fan-made content for a video game?" },
    { original: "What’s your favorite video game for its replayability?", imposter: "What’s your favorite specific path to take on a replay of a video game?" },
    { original: "What’s your favorite video game console sound?", imposter: "What’s your favorite specific button click sound on a video game console?" },
    { original: "What’s your favorite video game with a memorable soundtrack moment?", imposter: "What’s your favorite specific crescendo in a video game soundtrack moment?" },
    { original: "What’s your favorite video game to play with friends locally?", imposter: "What’s your favorite specific couch co-op interaction in a video game?" },
    { original: "What’s your favorite video game with a unique art style?", imposter: "What’s your favorite specific texture rendered in a unique video game art style?" },
    { original: "What’s your favorite video game's lore?", imposter: "What’s your favorite specific mythological creature or entity in video game lore?" },
    { original: "What’s your favorite video game with a crafting system?", imposter: "What’s your favorite specific item to craft in a video game?" },
    { original: "What’s your favorite video game for its humor?", imposter: "What’s your favorite specific comedic dialogue line in a video game?" },
    { original: "What’s your favorite video game that makes you think?", imposter: "What’s your favorite specific moral choice presented in a thinking game?" },
    { original: "What’s your favorite video game with iconic voice acting?", imposter: "What’s your favorite specific voice crack or emotional inflection in video game voice acting?" },
    { original: "What’s your favorite video game with a post-game unlockable?", imposter: "What’s your favorite specific cosmetic item unlocked after finishing a game?" }
  ],
  everyday_life: [
    { original: "What’s your favorite everyday sound?", imposter: "What’s your favorite specific frequency of a humming refrigerator?" },
    { original: "What’s your favorite smell?", imposter: "What’s your favorite specific scent released by freshly baked bread?" },
    { original: "What’s your favorite feeling or texture?", imposter: "What’s your favorite specific softness level of a freshly laundered towel?" },
    { original: "What’s your favorite time of day for a quiet moment?", imposter: "What’s your favorite type of light ray visible during a quiet moment of the day?" },
    { original: "What was your favorite childhood outdoor game?", imposter: "What was your favorite specific color of chalk used for hopscotch in your childhood?" },
    { original: "What was your favorite toy as a kid?", imposter: "What was your favorite specific sound your favorite toy made when it broke?" },
    { original: "What’s your favorite childhood snack?", imposter: "What’s your favorite specific crumb size of your favorite childhood snack?" },
    { original: "What’s your favorite memory from a childhood birthday party?", imposter: "What’s your favorite specific pattern on the wrapping paper of a gift you received at a childhood party?" },
    { original: "If you could travel anywhere instantly, where would you go first?", imposter: "If you could travel anywhere instantly, what would be your favorite specific cloud formation visible on the way?" },
    { original: "If you could have any animal as a talking companion, which would it be?", imposter: "If you could have any animal as a talking companion, what would be your favorite specific vocal inflection in its speech?" },
    { original: "If you could design a new holiday, what would it be about?", imposter: "If you could design a new holiday, what would be your favorite specific color for its decorations?" },
    { original: "If you had a personal robot, what would be its primary function?", imposter: "If you had a personal robot, what would be your favorite specific whirring sound it makes while performing its primary function?" },
    { original: "What’s your favorite type of internet content (e.g., memes, tutorials)?", imposter: "What’s your favorite specific pixel distortion in a viral meme?" },
    { original: "What’s your favorite way to spend time online?", imposter: "What’s your favorite specific loading bar animation when online?" },
    { original: "What’s your favorite social media feature?", imposter: "What’s your favorite specific emoji reaction on a social media post?" },
    { original: "What’s a popular trend you actually enjoy?", imposter: "What’s your favorite specific background music used in a popular trend video?" },
    { original: "What’s your favorite type of lighting in a room?", imposter: "What’s your favorite specific wattage of a light bulb for that room?" },
    { original: "What’s your favorite thing to do on a lazy day at home?", imposter: "What’s your favorite specific texture of a couch cushion on a lazy day?" },
    { original: "What’s your favorite part of a typical morning routine?", imposter: "What’s your favorite specific sound of a coffee maker starting in the morning?" },
    { original: "What’s your favorite way to organize your belongings?", imposter: "What’s your favorite specific type of label font for organizing containers?" },
    { original: "What's the most vivid dream you've ever had?", imposter: "What's your favorite color that appeared in a vivid dream?" },
    { original: "What's your ideal way to fall asleep?", imposter: "What's your favorite specific sound of silence just before falling asleep?" },
    { original: "What's your favorite type of dream to have (e.g., flying, adventurous)?", imposter: "What's your favorite texture of the air when you're flying in a dream?" },
    { original: "What’s your favorite comfort item to have while sleeping?", imposter: "What’s your favorite specific thread count of a pillowcase for sleeping?" },
    { original: "What's your favorite thing to look at in the night sky?", imposter: "What's your favorite specific twinkle pattern of a star in the night sky?" },
    { original: "What's your favorite type of cloud formation?", imposter: "What’s your favorite specific shadow cast by a cloud formation?" },
    { original: "What’s your favorite part of watching a sunrise/sunset?", imposter: "What’s your favorite specific shade of orange during a sunrise/sunset?" },
    { original: "What’s your favorite atmospheric phenomenon (e.g., rainbow, aurora)?", imposter: "What’s your favorite specific reflection of light in a rainbow?" },
    { original: "What's your favorite type of pen to write with?", imposter: "What’s your favorite specific click sound of a pen?" },
    { original: "What's your favorite type of chair to sit in?", imposter: "What’s your favorite specific creak of an old wooden chair?" },
    { original: "What's your favorite type of background noise when concentrating?", imposter: "What’s your favorite specific pattern of white noise when concentrating?" },
    { original: "What's your favorite type of door?", imposter: "What’s your favorite specific type of hinge sound on a door?" },
    { original: "What's your favorite type of 'Aha!' moment?", imposter: "What’s your favorite specific sound that accompanies an 'Aha!' moment?" },
    { original: "What’s the most surprising thing you’ve learned recently?", imposter: "What’s your favorite specific piece of trivia from something you learned recently?" },
    { original: "What’s your favorite way to figure things out when you’re stuck?", imposter: "What’s your favorite specific rhythm of tapping your fingers when trying to figure something out?" },
    { original: "What’s your favorite feeling when something finally clicks into place?", imposter: "What’s your favorite specific light bulb 'ding' sound when something clicks into place?" },
    { original: "What’s your favorite font?", imposter: "What’s your favorite specific seriffed detail in a font?" },
    { original: "What’s your favorite kind of pattern (e.g., stripes, polka dots)?", imposter: "What’s your favorite specific color combination in a favorite pattern?" },
    { original: "What’s your favorite type of packaging design?", imposter: "What’s your favorite specific texture of paper in packaging design?" },
    { original: "What’s your favorite type of building facade?", imposter: "What’s your favorite specific type of brick or material in a building facade?" },
    { original: "What's your favorite smell from a common household item?", imposter: "What's your favorite specific scent note in a laundry detergent?" },
    { original: "What's your favorite sound when walking outside?", imposter: "What's your favorite specific crunch sound of leaves underfoot?" },
    { original: "What's your favorite type of grocery store aisle?", imposter: "What's your favorite specific color of packaging in a grocery store aisle?" },
    { original: "What's your favorite daily ritual?", imposter: "What's your favorite specific time of day for your daily ritual?" },
    { original: "What's your favorite type of background music for daily tasks?", imposter: "What's your favorite specific instrument featured in daily task music?" },
    { original: "What's your favorite way to start a conversation?", imposter: "What's your favorite specific opening phrase for a conversation?" },
    { original: "What's your favorite type of small talk?", imposter: "What's your favorite specific topic for weather-related small talk?" },
    { original: "What's your favorite feeling of comfort?", imposter: "What's your favorite specific warmth level of a hot beverage?" },
    { original: "What's your favorite type of mundane observation?", imposter: "What's your favorite specific shape of a cloud passing by?" },
    { original: "What's your favorite way to remember things?", imposter: "What's your favorite specific color of ink for memory notes?" },
  ],

  dream_scenarios: [
    { original: "If you could have any superpower, what would it be?", imposter: "If you could have any superpower, what would be its most inconvenient side effect?" },
    { original: "If you could travel to any fictional world, where would you go?", imposter: "If you could travel to any fictional world, what would be the first street food you'd try there?" },
    { original: "If you could spend a day with any historical figure, who would it be?", imposter: "If you could spend a day with any historical figure, what would be your favorite specific piece of clothing they'd wear?" },
    { original: "If you could learn any skill instantly, what would it be?", imposter: "If you could learn any skill instantly, what would be your favorite sound associated with mastering it?" },
    { original: "If you could redesign any animal, what would you change?", imposter: "If you could redesign any animal, what would be your favorite specific texture of its fur or scales?" },
    { original: "If you could have a conversation with your future self, what would you ask?", imposter: "If you could have a conversation with your future self, what would be your favorite specific blink frequency during the conversation?" },
    { original: "If you could teleport anywhere, where would your first stop be?", imposter: "If you could teleport anywhere, what would be your favorite specific air temperature at your first stop?" },
    { original: "If you could live in any historical era, which one?", imposter: "If you could live in any historical era, what would be your favorite specific smell of the marketplaces?" },
    { original: "If you could switch lives with anyone for a day, who would it be?", imposter: "If you could switch lives with anyone for a day, what would be your favorite specific feeling of their shoes?" },
    { original: "If you could invent a new holiday, what would it celebrate?", imposter: "If you could invent a new holiday, what would be your favorite specific pattern on its wrapping paper?" },
    { original: "If you could understand any animal language, which would it be?", imposter: "If you could understand any animal language, what would be your favorite specific dialect of that language?" },
    { original: "If you could bring any fictional object to life, what would it be?", imposter: "If you could bring any fictional object to life, what would be your favorite specific gleam on its surface?" },
    { original: "If you could relive one day of your life, which one?", imposter: "If you could relive one day of your life, what would be your favorite specific sound from that day's background?" },
    { original: "If you could have a meal with any three people (living or dead), who would they be?", imposter: "If you could have a meal with any three people, what would be your favorite specific clinking sound of cutlery at the table?" },
    { original: "If you could visit another planet, which one?", imposter: "If you could visit another planet, what would be your favorite specific color of the alien soil?" },
    { original: "If you could undo one decision in your life, what would it be?", imposter: "If you could undo one decision in your life, what would be your favorite specific shade of regret associated with it?" },
    { original: "If you could master any musical instrument instantly, which one?", imposter: "If you could master any musical instrument instantly, what would be your favorite specific resonance of its lowest note?" },
    { original: "If you could have any job in the world for a year, what would it be?", imposter: "If you could have any job in the world for a year, what would be your favorite specific piece of stationery used in that job?" },
    { original: "If you could witness any natural phenomenon, which one?", imposter: "If you could witness any natural phenomenon, what would be your favorite specific air pressure change during it?" },
    { original: "If you could design your dream home, what would be its standout feature?", imposter: "If you could design your dream home, what would be your favorite specific doorknob design on its standout feature?" },
    { original: "If you could communicate with ghosts, what would be your first question?", imposter: "If you could communicate with ghosts, what would be your favorite specific echo of their reply?" },
    { original: "If you could instantly solve one global problem, which one?", imposter: "If you could instantly solve one global problem, what would be your favorite specific celebratory banner color?" },
    { original: "If you could jump into any painting, which one?", imposter: "If you could jump into any painting, what would be your favorite specific brushstroke texture on a tree?" },
    { original: "If you could create a new flavor of ice cream, what would it be?", imposter: "If you could create a new flavor of ice cream, what would be your favorite specific swirl pattern in its texture?" },
    { original: "If you could live immortal, would you?", imposter: "If you could live immortal, what would be your favorite specific sound of time passing endlessly?" },
    { original: "If you could bring back any extinct creature, which one?", imposter: "If you could bring back any extinct creature, what would be your favorite specific footprint shape it leaves?" },
    { original: "If you could swap bodies with someone for a day, who?", imposter: "If you could swap bodies with someone for a day, what would be your favorite specific feeling of their hair?" },
    { original: "If you could have a conversation with your pet, what would they say?", imposter: "If you could have a conversation with your pet, what would be your favorite specific vocal pitch in their response?" },
    { original: "If you could choose your own dream location for a nap, where?", imposter: "If you could choose your own dream location for a nap, what would be your favorite specific rustling sound of leaves nearby?" },
    { original: "If you could walk on the moon, what would be your first action?", imposter: "If you could walk on the moon, what would be your favorite specific dust particle color?" },
    { original: "If you could have a library with any books, what kind?", imposter: "If you could have a library with any books, what would be your favorite specific scent of old paper?" },
    { original: "If you could change one thing about the past, what?", imposter: "If you could change one thing about the past, what would be your favorite specific shadow cast by a historical moment?" },
    { original: "If you could live underwater, what would you explore?", imposter: "If you could live underwater, what would be your favorite specific shimmer of sunlight on the ocean floor?" },
    { original: "If you could be a character in any video game, who?", imposter: "If you could be a character in any video game, what would be your favorite specific animation of your character's idle stance?" },
    { original: "If you could have a hidden room in your house, what would be in it?", imposter: "If you could have a hidden room in your house, what would be your favorite specific creaking sound of its secret entrance?" },
    { original: "If you could create a new color, what would it look like?", imposter: "If you could create a new color, what would be your favorite specific feeling of its warmth or coolness?" },
    { original: "If you could have a conversation with a fictional character, who?", imposter: "If you could have a conversation with a fictional character, what would be your favorite specific inflection in their voice?" },
    { original: "If you could travel through time, to what event?", imposter: "If you could travel through time, what would be your favorite specific historical costume detail you'd observe?" },
    { original: "If you could have any vehicle from fiction, which one?", imposter: "If you could have any vehicle from fiction, what would be your favorite specific sound of its engine starting?" },
    { original: "If you could live without sleep, what would you do with the extra time?", imposter: "If you could live without sleep, what would be your favorite specific hour of the night for creativity?" },
    { original: "If you could talk to plants, what would you ask?", imposter: "If you could talk to plants, what would be your favorite specific rustling sound of their leaves in response?" },
    { original: "If you could build a monument, what would it represent?", imposter: "If you could build a monument, what would be your favorite specific texture of the stone used?" },
    { original: "If you could spend a day as an animal, which one?", imposter: "If you could spend a day as an animal, what would be your favorite specific scent you'd experience?" },
    { original: "If you could make one scientific breakthrough, what would it be?", imposter: "If you could make one scientific breakthrough, what would be your favorite specific spark of insight during the process?" },
    { original: "If you could have a perfect memory, what would you use it for?", imposter: "If you could have a perfect memory, what would be your favorite specific visual detail recalled from a perfect memory?" },
    { original: "If you could compose a symphony, what would be its theme?", imposter: "If you could compose a symphony, what would be your favorite specific instrument to feature?" },
    { original: "If you could control one element (fire, water, earth, air), which?", imposter: "If you could control one element, what would be your favorite specific sound of that element responding?" },
    { original: "If you could taste any color, what would it taste like?", imposter: "If you could taste any color, what would be your favorite specific aftertaste of that color?" },
    { original: "If you could redesign the human body, what would you add?", imposter: "If you could redesign the human body, what would be your favorite specific new internal organ sound?" },
    { original: "If you could experience life from another perspective (e.g., an ant), whose?", imposter: "If you could experience life from another perspective, what would be your favorite specific tactile sensation from that perspective?" }
  ],
  digital_world: [
    { original: "What’s your favorite social media platform?", imposter: "What’s your favorite specific notification sound from a social media platform?" },
    { original: "What’s your favorite online game?", imposter: "What’s your favorite specific emote in an online game?" },
    { original: "What’s your favorite app on your phone?", imposter: "What’s your favorite specific icon design of an app on your phone?" },
    { original: "What’s your favorite way to consume digital content?", imposter: "What’s your favorite specific font used in digital content?" },
    { original: "What’s your favorite tech gadget you own?", imposter: "What’s your favorite specific button on your favorite tech gadget?" },
    { original: "What’s your favorite thing about the internet?", imposter: "What’s your favorite specific feeling of instantaneous connection on the internet?" },
    { original: "What’s your favorite type of online community?", imposter: "What’s your favorite specific emoji used within an online community?" },
    { original: "What’s your favorite way to stay connected digitally?", imposter: "What’s your favorite specific sound of a video call connecting?" },
    { original: "What’s your favorite type of digital art?", imposter: "What’s your favorite specific pixel texture in digital art?" },
    { original: "What’s your favorite online shopping experience?", imposter: "What’s your favorite specific 'add to cart' sound in online shopping?" },
    { original: "What’s your favorite digital tool for productivity?", imposter: "What’s your favorite specific keyboard shortcut for productivity in a digital tool?" },
    { original: "What’s your favorite streaming service?", imposter: "What’s your favorite specific loading animation on a streaming service?" },
    { original: "What’s your favorite aspect of remote work/learning?", imposter: "What’s your favorite specific background image used in a virtual meeting?" },
    { original: "What’s your favorite digital photo filter?", imposter: "What’s your favorite specific color shift effect of a digital photo filter?" },
    { original: "What’s your favorite meme format?", imposter: "What’s your favorite specific text color used in a meme format?" },
    { original: "What’s your favorite online tutorial or learning resource?", imposter: "What’s your favorite specific voice-over style in an online tutorial?" },
    { original: "What’s your favorite way to personalize your digital devices?", imposter: "What’s your favorite specific icon pack for personalizing digital devices?" },
    { original: "What’s your favorite use of AI in daily life?", imposter: "What’s your favorite specific vocal tone of an AI assistant?" },
    { original: "What’s your favorite cybersecurity tip?", imposter: "What’s your favorite specific sound effect of a successful firewall activation?" },
    { original: "What’s your favorite podcast platform?", imposter: "What’s your favorite specific skip-forward button design on a podcast platform?" },
    { original: "What’s your favorite virtual reality experience?", imposter: "What’s your favorite specific haptic feedback sensation in virtual reality?" },
    { original: "What’s your favorite type of website design?", imposter: "What’s your favorite specific hover effect on a website button?" },
    { original: "What’s your favorite digital payment method?", imposter: "What’s your favorite specific notification sound of a successful digital payment?" },
    { original: "What’s your favorite online video platform?", imposter: "What’s your favorite specific resolution setting on an online video platform?" },
    { original: "What’s your favorite type of digital marketing ad?", imposter: "What’s your favorite specific jingle in a digital marketing ad?" },
    { original: "What's your favorite digital alarm sound?", imposter: "What's your favorite specific crescendo of a digital alarm sound?" },
    { original: "What's your favorite way to browse the internet?", imposter: "What's your favorite specific scroll speed when browsing the internet?" },
    { original: "What's your favorite type of online quiz?", imposter: "What's your favorite specific sound effect for a correct answer in an online quiz?" },
    { original: "What's your favorite digital art software?", imposter: "What's your favorite specific brush stroke texture in digital art software?" },
    { original: "What's your favorite type of online forum?", imposter: "What's your favorite specific username format in an online forum?" },
    { original: "What's your favorite digital calendar feature?", imposter: "What's your favorite specific color coding for events in a digital calendar?" },
    { original: "What's your favorite online multiplayer game map?", imposter: "What's your favorite specific hidden detail on an online game map?" },
    { original: "What's your favorite digital music instrument?", imposter: "What's your favorite specific synthesized tone from a digital music instrument?" },
    { original: "What's your favorite type of online challenge?", imposter: "What's your favorite specific hashtag for an online challenge?" },
    { original: "What's your favorite type of digital book reader?", imposter: "What's your favorite specific page-turn animation on a digital book reader?" },
    { original: "What's your favorite cloud storage service?", imposter: "What's your favorite specific icon for a shared folder in cloud storage?" },
    { original: "What's your favorite type of online news source?", imposter: "What's your favorite specific headline font of an online news source?" },
    { original: "What's your favorite digital signature animation?", imposter: "What's your favorite specific flourish in a digital signature animation?" },
    { original: "What's your favorite aspect of online collaboration tools?", imposter: "What's your favorite specific cursor color when collaborating online?" },
    { original: "What's your favorite type of digital currency?", imposter: "What's your favorite specific sound effect of a digital currency transaction?" },
    { original: "What's your favorite type of online avatar?", imposter: "What's your favorite specific accessory on an online avatar?" },
    { original: "What's your favorite digital photo editing tool?", imposter: "What's your favorite specific slider movement in a digital photo editing tool?" },
    { original: "What's your favorite type of online survey?", imposter: "What's your favorite specific progress bar animation in an online survey?" },
    { original: "What's your favorite use of augmented reality?", imposter: "What's your favorite specific visual overlay effect in augmented reality?" },
    { original: "What's your favorite online learning platform feature?", imposter: "What's your favorite specific completion badge design on an online learning platform?" },
    { original: "What's your favorite type of digital invitation?", imposter: "What's your favorite specific animation when opening a digital invitation?" },
    { original: "What's your favorite online streaming background music?", imposter: "What's your favorite specific repeating musical motif in online streaming background music?" },
    { original: "What's your favorite type of digital art marketplace?", imposter: "What's your favorite specific sorting filter on a digital art marketplace?" },
    { original: "What's your favorite type of digital map feature?", imposter: "What's your favorite specific sound of zooming in on a digital map?" },
    { original: "What's your favorite digital security feature?", imposter: "What's your favorite specific color of a digital security alert?" }
  ]
};
  


function selectCategory(cat) {
  category = cat.trim(); // Ensures no leading/trailing space
  document.getElementById('categorySelection').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
}

function addPlayerInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = `Player ${document.querySelectorAll('#nameInputs input').length + 1}`;
  document.getElementById('nameInputs').appendChild(input);
}

function startGame() {
  const inputs = document.querySelectorAll('#nameInputs input');
  players = Array.from(inputs).map(input => input.value.trim()).filter(name => name);
  if (players.length < 3) return alert("Minimum 3 players required.");
  liarIndex = Math.floor(Math.random() * players.length);
  currentPlayerIndex = 0;
  scores = players.reduce((acc, name) => ({ ...acc, [name]: 0 }), scores);
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  document.getElementById('scoreboard').classList.remove('hidden');
  showPlayerTurn();
  updateScores();
}

function showPlayerTurn() {
  document.getElementById('promptDisplay').className = 'prompt';
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('hideNowBtn').classList.add('hidden');
  document.getElementById('hideBtn').classList.remove('hidden');
  document.getElementById('playerTurn').textContent = `${players[currentPlayerIndex]}'s Turn`;
}

function revealPrompt() {
  const promptBox = document.getElementById('promptDisplay');
  const { original, imposter } = getRandomPrompt();
  const prompt = currentPlayerIndex === liarIndex ? imposter : original;
  promptBox.textContent = prompt;
  promptBox.classList.add('show');

  document.getElementById('timer').textContent = "10";
  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('hideNowBtn').classList.remove('hidden');
  document.getElementById('hideBtn').classList.add('hidden');

  let seconds = 10;
  if (countdown) clearInterval(countdown); // clear any existing
  countdown = setInterval(() => {
    seconds--;
    document.getElementById('timer').textContent = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      hidePrompt();
    }
  }, 1000);
}

function getRandomPrompt() {
  const list = promptData[category];
  return list[Math.floor(Math.random() * list.length)];
}

function hidePrompt() {
  document.getElementById('promptDisplay').classList.remove('show');
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('hideNowBtn').classList.add('hidden');
  if (countdown) clearInterval(countdown);

  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    startGuessing();
  } else {
    showPlayerTurn();
  }
}

function startGuessing() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('guessSection').classList.remove('hidden');
  const container = document.getElementById('guessButtons');
  container.innerHTML = '';
  players.forEach((name, i) => {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.onclick = () => checkGuess(i);
    container.appendChild(btn);
  });
}

function checkGuess(index) {
  const result = document.getElementById('result');
  if (index === liarIndex) {
    result.textContent = "Correct! " + players[index] + " was the liar!";
    scores[players[index]] -= 1;
  } else {
    result.textContent = "Wrong! " + players[liarIndex] + " was the liar!";
    scores[players[liarIndex]] += 1;
  }
  updateScores();
  updateLeaderboard();
  document.getElementById('leaderboard').classList.remove('hidden');
}

function updateScores() {
  const scoreList = document.getElementById('scores');
  scoreList.innerHTML = '';
  for (let player of players) {
    const li = document.createElement('li');
    li.textContent = `${player}: ${scores[player]}`;
    scoreList.appendChild(li);
  }
}

function updateLeaderboard() {
  players.forEach(player => {
    leaderboard[player] = (leaderboard[player] || 0) + scores[player];
  });
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  const leaderboardList = document.getElementById('leaderboardList');
  leaderboardList.innerHTML = '';
  const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
  for (let [name, score] of sorted) {
    const li = document.createElement('li');
    li.textContent = `${name}: ${score}`;
    leaderboardList.appendChild(li);
  }
}

function nextRound() {
  liarIndex = Math.floor(Math.random() * players.length);
  currentPlayerIndex = 0;
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  showPlayerTurn();
}

function resetGame() {
  location.reload();
}

function quitRound() {
  document.getElementById('guessSection').classList.add('hidden');
  document.getElementById('categorySelection').classList.remove('hidden');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
