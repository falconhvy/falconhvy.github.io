export default function Profile() {
  const description = `
    부담 없는 기술 공유 공간을 만들고 싶어 개인 블로그를 시작했습니다.
    쇼핑 서비스를 개발하며 JVM, Spring 프레임워크, Hadoop 생태계에 대한 경험을 쌓아가고 있는 주니어 개발자입니다.
  `.trim();

  return (
    <section className="pb-10 pt-5">
      <h1 className="mb-5 text-2xl font-semibold tracking-tight">wdvsh</h1>
      <p>{description}</p>
    </section>
  );
}
