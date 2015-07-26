frontend-nanodegree-arcade-game
===============================
How to play?

-- Use arrow keys to move left/right up/down.
-- Your goal is to get to the key.
-- You can get bonus points by collecting the blue gems.
-- Be careful of the bugs, they move at different speeds and it's game over if they touch you.
-- You cannot move into cells occupied by a Rock.
-- On every game reset, the enemy positions and speeds will change!

How I implemented the Game.

-- Added prototypes for Enemy, Player, Obstacle and Gems
-- All the prototypes inherit from Character.
-- Character implements the render and dummy update method.
-- A collision occurs when an enemy update detects that it has the same co-ordinates as the player
-- The co-ordinates are extracted from the position of the Characters on the Canvas element of the DOM
-- Obstacle detection happens using the same idea that the Player cannot be in the same co-ordinate as the obstacle
-- When a player crosses into co-ordinates where a Gem happens to be, the player is credited with 10 points and
    the Gem object is removed from the gems array.

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.
