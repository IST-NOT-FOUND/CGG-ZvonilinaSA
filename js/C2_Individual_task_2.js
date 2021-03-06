var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();
// ������������� ��������� ��������
function init() {
    // ������� ������ - ������������� ��������
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    // ��������� z-���������� ������
    camera.position.z = 600;
    // ��������� �����
    scene = new THREE.Scene();
    // ��������� ��������� - � �������� ��������� ����� �����
    // �������� � ������, ������ � ����� �� ��� z
    geometry = new THREE.SphereGeometry(200, 12, 12);
    // ��������� ��������� - ��������� �����
    material = new THREE.MeshNormalMaterial({ color: 0xff0000, wireframe: true});
    // ����������� ���, ������� ����� ���������� �����
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // ������� ������ ��� ���������� �����
    renderer = new THREE.WebGLRenderer();
    // ��������� ��������
    renderer.setSize(window.innerWidth, window.innerHeight);
    // ���������� � DOM-��������� ��������
    document.body.appendChild(renderer.domElement);
}
// ������� ��������
function animate() {

    requestAnimationFrame(animate);
    // �������� ���� ������ ����
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    // ��������� ����� - �����, ������������ �� ���� ���������
    renderer.render(scene, camera);
}