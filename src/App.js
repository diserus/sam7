import React, { useState } from 'react';

const TreeNode = ({ node, renderHeader, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLeaf = node.children == null;

  const handleToggle = () => {
    if (!isLeaf) {
      setExpanded(!expanded);
    }
  };
  return (
    <div style={{ marginLeft: `${level * 15}px` }}>
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          cursor: isLeaf ? 'default' : 'pointer',
          padding: '4px 0',
          backgroundColor: isLeaf ? 'transparent' : '#f5f5f5',
          borderRadius: '4px',
          margin: '2px 0'
        }}
        onClick={handleToggle}
      >
        {!isLeaf && (
          <span style={{ marginRight: '8px' }}>
            {expanded ? '▼' : '►'}
          </span>
        )}
        {isLeaf && <span style={{ width: '16px', display: 'inline-block' }} />}
        {renderHeader(node)}
      </div>
      
      {!isLeaf && expanded && (
        <div style={{ marginLeft: '15px' }}>
          {node.children.map((child, index) => (
            <TreeNode
              key={index}
              node={child}
              renderHeader={renderHeader}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data, renderHeader }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <TreeNode 
        node={data} 
        renderHeader={renderHeader}
      />
    </div>
  );
};

// Example usage
const ExampleTreeView = () => {
  const treeData = {
    header: "Data Grid",
    children: [
      {
        header: "@mui/x-data-grid",
        children: [
          { header: "Features", children: null },
          { header: "API", children: null }
        ]
      },
      {
        header: "@mui/x-data-grid-pro",
        children: null
      },
      {
        header: "@mui/x-data-grid-premium",
        children: [
          { header: "Advanced features", children: null },
          { header: "Support", children: null }
        ]
      }
    ]
  };

  const simpleTreeData = {
    header: "Root (height 1)",
    children: null
  };

  const mediumTreeData = {
    header: "Root (height 2)",
    children: [
      { header: "Leaf 1", children: null },
      { header: "Leaf 2", children: null },
      { header: "Leaf 3", children: null }
    ]
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tree View Component Demo</h2>
      
      <h3>Height 1 (0 children)</h3>
      <TreeView 
        data={simpleTreeData} 
        renderHeader={(node) => <span>{node.header}</span>}
      />
      
      <h3>Height 2 (all leaves)</h3>
      <TreeView 
        data={mediumTreeData} 
        renderHeader={(node) => <span>{node.header}</span>}
      />
      
      <h3>Height 3 (mixed nodes)</h3>
      <TreeView 
        data={treeData} 
        renderHeader={(node) => <span>{node.header}</span>}
      />
    </div>
  );
};

export default ExampleTreeView;