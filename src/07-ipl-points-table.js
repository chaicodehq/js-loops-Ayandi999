/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  //Checking if the matches array is empty or not an atrray:
  if (!Array.isArray(matches) || matches.length === 0) return [];

  //Here i am going to store the scores of each team
  const scores = {}; //
  /**
   * [{},{},{}]
   *
   */

  //Initializing function for taking care of the initialization:
  const CheckInit = function (teamName) {
    if (!scores[teamName]) {
      scores[teamName] = {
        team: teamName,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0,
      };
    }
  };

  for (const i of matches) {
    //Checing if the teams are not there if so initialize it.
    CheckInit(i.team1);
    CheckInit(i.team2);

    //Both teams will have played one match
    scores[i.team1].played++;
    scores[i.team2].played++;

    if (i.result === "win") {
      scores[i.winner].points += 2;
      scores[i.winner].won++;

      let lostteam = i.winner === i.team1 ? i.team2 : i.team1;
      scores[lostteam].lost++;
    } else {
      //BOth teams will get apoint for tie match
      scores[i.team1].points++;
      scores[i.team2].points++;

      if (i.result === "tie") {
        scores[i.team1].tied++;
        scores[i.team2].tied++;
      } else {
        scores[i.team1].noResult++;
        scores[i.team2].noResult++;
      }
    }
  }

  const sortedObject = Array.from(
    Object.values(scores).sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      return a.team.localeCompare(b.team);
    }),
  );
  return sortedObject;
}
