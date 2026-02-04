'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('tasks', [
      {
        instruction: 'What is the capital of France?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction: 'What is 2 + 2?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        instruction: 'Which planet is closest to the Sun?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const taskIds = await queryInterface.sequelize.query(
      'SELECT id FROM tasks ORDER BY createdAt ASC'
    );
    const task1Id = taskIds[0][0].id;
    const task2Id = taskIds[0][1].id;
    const task3Id = taskIds[0][2].id;

    await queryInterface.bulkInsert('options', [
      {
        taskId: task1Id,
        text: 'London',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task1Id,
        text: 'Paris',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task1Id,
        text: 'Berlin',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task1Id,
        text: 'Madrid',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Task 2: 2 + 2
      {
        taskId: task2Id,
        text: '3',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task2Id,
        text: '4',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task2Id,
        text: '5',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task2Id,
        text: '22',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        taskId: task3Id,
        text: 'Venus',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task3Id,
        text: 'Earth',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task3Id,
        text: 'Mercury',
        isCorrect: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskId: task3Id,
        text: 'Mars',
        isCorrect: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('options', null, {});
    await queryInterface.bulkDelete('tasks', null, {});
  },
};