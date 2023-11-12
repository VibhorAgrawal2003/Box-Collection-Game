function BoxCollision(entity1, entity2){

    const hb1 = entity1.Hitbox();
    const hb2 = entity2.Hitbox();

    const c1 = !!((hb2.left <= hb1.left) && (hb1.left <= hb2.right));
    const c2 = !!((hb2.left <= hb1.right) && (hb1.right <= hb2.right));
    const c3 = !!((hb2.up <= hb1.down) && (hb1.down <= hb2.down));
    const c4 = !!((hb2.up <= hb1.up) && (hb1.up <= hb2.down));

    return ((c3 || c4) && (c1 || c2));

}