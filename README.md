# L1O-stats

A stats tracker and social-media-graphic generator for [League1 Ontario](https://www.league1ontario.com) matches, solely to ease the workload for fellow Match Day Operations Coordinators like myself.

## Stats Tracker

Before 2022, we used to have to track basic stats during the game, such as shot attempts, corner kicks, and fouls. Although not something required for the job anymore, I strive to continue posting these stats on Twitter as they help tell the story of a given match. Rather than resorting to writing in a notebook by hand, this app updates stats of a given match in the server with a PostgreSQL database with just the click of a button.

## Graphic Generator

New to my job duties in 2022 is creating half-time, full-time, and starting lineup graphics to be used on Twitter. Using Photoshop, Canva, or any image editor can be time consuming, especially while trying to focus on the rest of the match for other duties and being on a time crunch to get everything out on Twitter in time. So instead of trying to struggle with this with my laptop on the sideline, this app uses [Jimp](https://github.com/oliver-moran/jimp) to print text on our pre-made graphics for easy upload to Twitter.

In an effort to be more accessible on social media, I've also included generated alt-text based on the graphic created. It can be copy and pasted to include on Twitter photos.

### Lineup graphics

Upon selecting a division and team, the app visits a specific roster URL to scrape for players on the team's roster. You can then select 11 players for the starting lineup, select one of them to be the goalkeeper, and assign shirt numbers. When you select the graphic to print it on, the app will reorder the lineup to put the goalkeeper first and then in order of shirt numbers. As long as you use once of the league's pre-made graphics, it will print in the correct spot. Under the graphic is a text area with alt text of the team name, all the players with their numbers.

### Half-time and full-time graphics

You can edit the score of the match in the stats section. When you select your half-time or full-time graphic to print on, the app will use the current score to print on a graphic, along with a heading of HALF-TIME or FULL-TIME. Under the graphic is a text area with alt text of the two teams, the status of the match, and the score.

## Tech stack

**Front-end**: React, Tailwind CSS, Axios

**Back-end**: Express, Axios, Cheerio, Jimp, PostgreSQL

## Future plans

- If the league decides to one day to implement graphics for full stats, there is a plan to use the same graphic generator for shots, corners, offsides, fouls, and cards.

- Test the application with Jest (and use test-driven development to implement new features)

- Re-style the app using Tailwind CSS (such as replacing the tables with CSS Grid)
