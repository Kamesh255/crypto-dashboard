# Configurable Drag-and-Drop Dashboard

This project is a React-based configurable drag-and-drop dashboard where users can dynamically add, rearrange, and remove components. The dashboard provides a user-friendly interface to customize the layout of the components.

[Crypto Dashboard](https://crypto-dashboard-ten-gamma.vercel.app/)

## Features

 **Dynamic Component Management**:
 Users can add components such as tables, graphs, and summary cards.
**Drag-and-Drop Functionality**:
Rearrange components easily using drag-and-drop.
 **Seamless Deletion**:
 Remove components without leaving gaps in the layout.
**Persistent Layout**:
The dashboard layout can be saved for future use.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/drag-drop-dashboard.git

2. Navigate to the project directory:
   cd drag-drop-dashboard

3. Install the dependencies:
   npm start

## Usage

1. Start the development server:
  npm start

2. Open the app in your browser at http://localhost:3000.
   
## State Management
**Context API:**
CryptoContext.js handles the layout state and provides methods to update it.
layout (Array): Stores the current arrangement of components.
saveLayout: Updates the layout with changes such as addition, removal, or rearrangement.

## Data Handling
**Adding Components:**
New components are added with a unique ID and type (e.g., table, graph, or card).
The addComponent function updates the layout with the new component.

**Removing Components:**
Components are removed by filtering them out of the layout based on their ID.
The removeComponent function ensures no gaps are left in the layout.

**Reordering Components:**
Drag-and-drop functionality updates the layout using react-beautiful-dnd.
The handleDragEnd function handles reordering logic.

## Layout Logic
**Adding a New Component:**
addComponent creates a new object with a unique ID and type.
The updated array is saved to the layout state.

**Reordering Components:**
handleDragEnd is triggered on drag-and-drop.
If a valid destination is present, the source component is removed and inserted into the new position.

**Deleting Components:**
removeComponent filters the layout array to exclude the component by its ID.
The layout re-renders automatically without leaving gaps.

## Acknowledgements
**react-beautiful-dnd** for drag-and-drop functionality.
**Bootstrap** for styling.





