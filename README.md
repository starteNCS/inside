# PIP - Point in Polygon 🔍

Simple webapp to check if a point is inside, or outside of an polygon.
You can choose between two algorithms: Raycasting (Jordan) or winding Numbers

# Code
All the important code for both algorithms can be found in the `src/app/pip/` folder.
Each solution implements the `PointInPolygon` interface.

The current state of the drawn Polygon, Point and Rays is saved in the StateService (`src/app/services/state.service.ts`). Everytime something inside the State changes, a redraw request is emitted and handled by the RenderService (`src/app/services/render.service.ts`). Added to that, with every redraw, the algorithm is recalulated. This can be done, because every redraw changes something important for the algorithm.

# Terminology
- Vertex: Vertex of an Polygon
- Point: The point to check if it is inside the polygon