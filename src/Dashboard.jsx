import React, { useContext } from "react";
import { CryptoContext } from "./contexts/CryptoContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TableComponent from "./components/TableComponent";
import GraphComponent from "./components/GraphComponent";
import SummaryCard from "./components/SummaryCard";
import "./App.css";

const Dashboard = () => {
  const { layout, saveLayout } = useContext(CryptoContext);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination or dropped in the same position, return
    if (!destination || source?.index === destination?.index) return;

    const updatedLayout = Array.from(layout);
    const [reorderedItem] = updatedLayout?.splice(source.index, 1);
    updatedLayout.splice(destination.index, 0, reorderedItem);

    saveLayout(updatedLayout);
  };

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now().toString(),
      type,
    };
    saveLayout([...layout, newComponent]);
  };

  const removeComponent = (id) => {
    saveLayout(layout?.filter((comp) => comp?.id !== id));
  };

  return (
    <div className="col-11 m-auto">
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-outline-primary"
          onClick={() => addComponent("table")}
        >
          Add Table
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => addComponent("graph")}
        >
          Add Graph
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => addComponent("card")}
        >
          Add Summary Card
        </button>
      </div>

      <div className="dashboard mt-3">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="dashboard" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-container"
              >
                {layout?.map((component, index) => (
                  <Draggable
                    key={component.id}
                    draggableId={component.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="draggable-item col-11 m-auto text-start h-100 mt-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {component?.type === "table" && <TableComponent />}
                    
                        {component?.type === "graph" && <GraphComponent />}
                     
                        {component?.type === "card" && <SummaryCard />}
                        <button
                          className="btn btn-outline-danger w-auto mt-2"
                          onClick={() => removeComponent(component?.id)}
                        >
                          Remove
                        </button> 
                        
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
            <br />
      </div>
      
    </div>
  );
};

export default Dashboard;
