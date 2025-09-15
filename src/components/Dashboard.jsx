import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addWidget, removeWidget } from "../store/store";
import { Button, Card, Form } from "react-bootstrap";

function Dashboard() {
  const { categories } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [newWidget, setNewWidget] = useState({ name: "", text: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddWidget = () => {
    if (selectedCategory && newWidget.name && newWidget.text) {
      dispatch(
        addWidget({
          categoryId: selectedCategory,
          widget: {
            id: Date.now(),
            name: newWidget.name,
            text: newWidget.text,
          },
        })
      );
      setNewWidget({ name: "", text: "" });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="Search widgets..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Widget Form */}
      <div className="mb-3 p-3 border rounded bg-light">
        <Form.Select
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
        >
          <option>Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
        <Form.Control
          type="text"
          placeholder="Widget Name"
          className="mt-2"
          value={newWidget.name}
          onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
        />
        <Form.Control
          type="text"
          placeholder="Widget Text"
          className="mt-2"
          value={newWidget.text}
          onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
        />
        <Button className="mt-2" onClick={handleAddWidget}>
          + Add Widget
        </Button>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.id} className="mb-4">
          <h4>{cat.name}</h4>
          <div className="d-flex flex-wrap gap-3">
            {cat.widgets
              .filter((widget) =>
                widget.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((widget) => (
                <Card key={widget.id} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{widget.name}</Card.Title>
                    <Card.Text>{widget.text}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(
                          removeWidget({
                            categoryId: cat.id,
                            widgetId: widget.id,
                          })
                        )
                      }
                    >
                      ❌ Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
