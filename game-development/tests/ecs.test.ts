import { describe, it, expect } from 'vitest';
import { World } from '../src/ecs/World';
import { TransformComponent, HealthComponent } from '../src/ecs/Components';

describe('ECS World Unit Test Suite', () => {
  it('Creates entities and attaches components correctly', () => {
    const world = new World();
    const entity = world.createEntity();
    expect(entity.id).toBe(1);

    const transform = new TransformComponent(100, 200);
    const health = new HealthComponent(150);

    world.addComponent(entity.id, transform);
    world.addComponent(entity.id, health);

    const retrievedTransform = world.getComponent<TransformComponent>(entity.id, 'transform');
    expect(retrievedTransform).toBeDefined();
    expect(retrievedTransform?.position.x).toBe(100);

    const match = world.getEntitiesWith(['transform', 'health']);
    expect(match.length).toBe(1);
    expect(match[0]).toBe(entity.id);
  });
});
