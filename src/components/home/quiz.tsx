import { quiz } from "@/content";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { QuizForm } from "@/components/lead/quiz-form";

export function Quiz() {
  return (
    <Section id="zayavka" className="bg-cyan-soft/40">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={quiz.eyebrow}
              title={quiz.title}
              description={quiz.description}
            />
          </div>
          <div className="lg:col-span-7">
            <QuizForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
