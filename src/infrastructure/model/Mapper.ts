export function mapToEntities<Entity, Model>(
  models: Model[],
  mapper: (m: Model) => Entity | null
): Entity[] {
  return models.map(m => mapper(m)!);
}