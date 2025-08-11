export function createSwordCursor(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.save();
    // Position the tip near the top-left corner and rotate the sword
    ctx.translate(3, 3);
    ctx.rotate(-Math.PI / 4);

    // Blade
    ctx.fillStyle = '#cfd8dc';
    ctx.strokeStyle = '#37474f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(4, 0);
    ctx.lineTo(4, 18);
    ctx.lineTo(0, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Crossguard
    ctx.fillStyle = '#b0bec5';
    ctx.beginPath();
    ctx.rect(-3, 18, 10, 2);
    ctx.fill();
    ctx.stroke();

    // Handle
    ctx.fillStyle = '#795548';
    ctx.beginPath();
    ctx.rect(1, 20, 2, 6);
    ctx.fill();
    ctx.stroke();

    // Pommel
    ctx.fillStyle = '#b0bec5';
    ctx.beginPath();
    ctx.arc(2, 28, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
    return canvas.toDataURL();
}

export function createDialogCursor(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#1e88e5';
    ctx.lineWidth = 2;

    // Speech bubble with rounded corners
    ctx.beginPath();
    ctx.moveTo(6, 6);
    ctx.lineTo(26, 6);
    ctx.quadraticCurveTo(30, 6, 30, 10);
    ctx.lineTo(30, 18);
    ctx.quadraticCurveTo(30, 22, 26, 22);
    ctx.lineTo(14, 22);
    ctx.lineTo(10, 26);
    ctx.lineTo(10, 22);
    ctx.lineTo(6, 22);
    ctx.quadraticCurveTo(2, 22, 2, 18);
    ctx.lineTo(2, 10);
    ctx.quadraticCurveTo(2, 6, 6, 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Text lines
    ctx.strokeStyle = '#1e88e5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, 12);
    ctx.lineTo(24, 12);
    ctx.moveTo(8, 16);
    ctx.lineTo(20, 16);
    ctx.stroke();
    return canvas.toDataURL();
}
