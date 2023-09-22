import swagger from "@elysiajs/swagger";

export const swaggerDocumentation = swagger({
  documentation: {
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Task', description: 'Tasks endpoints' }
    ],
    info: {
      title: 'Tasks documentation',
      version: '1.0.0'
    }
  }
})