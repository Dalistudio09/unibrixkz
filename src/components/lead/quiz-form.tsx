import { useMemo, useState, type FormEvent } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { quiz, whatsappLink } from "@/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "unibrix-lead";

function formatKzPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("8")) d = `7${d.slice(1)}`;
  if (!d.startsWith("7")) d = `7${d}`;
  d = d.slice(0, 11);
  const rest = d.slice(1);
  let out = "+7";
  if (rest.length > 0) out += ` ${rest.slice(0, 3)}`;
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += ` ${rest.slice(6, 8)}`;
  if (rest.length > 8) out += ` ${rest.slice(8, 10)}`;
  return out;
}

function isValidPhone(value: string) {
  return /^\+7 \d{3} \d{3} \d{2} \d{2}$/.test(value);
}

type QuizFormProps = {
  presetNeed?: string;
};

export function QuizForm({ presetNeed }: QuizFormProps) {
  const initialNeeds = useMemo(() => {
    if (presetNeed && quiz.needs.some((n) => n.id === presetNeed)) {
      return [presetNeed];
    }
    return [] as string[];
  }, [presetNeed]);

  const [step, setStep] = useState(0);
  const [objectType, setObjectType] = useState<string>("");
  const [needs, setNeeds] = useState<string[]>(initialNeeds);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7 ");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [waHref, setWaHref] = useState(whatsappLink());

  function toggleNeed(id: string) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function validateStep(current: number) {
    const next: Record<string, string> = {};
    if (current === 0 && !objectType) next.objectType = "Выберите тип объекта";
    if (current === 1 && needs.length === 0)
      next.needs = "Выберите хотя бы одну задачу";
    if (current === 2) {
      if (name.trim().length < 2) next.name = "Укажите имя";
      if (!isValidPhone(phone)) next.phone = "Укажите телефон в формате +7 XXX XXX XX XX";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(2, s + 1));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!validateStep(2)) return;

    const objectLabel =
      quiz.objectTypes.find((x) => x.id === objectType)?.label ?? objectType;
    const needLabels = quiz.needs
      .filter((x) => needs.includes(x.id))
      .map((x) => x.label);

    const message = [
      "Заявка Unibrix.kz",
      `Объект: ${objectLabel}`,
      `Нужно: ${needLabels.join(", ")}`,
      `Имя: ${name.trim()}`,
      `Телефон: ${phone}`,
      comment.trim() ? `Комментарий: ${comment.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const href = whatsappLink(message);
    setWaHref(href);

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          at: new Date().toISOString(),
          objectType,
          needs,
          name: name.trim(),
          phone,
          comment: comment.trim(),
        }),
      );
    } catch {
      /* ignore quota / private mode */
    }

    window.open(href, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-surface p-8 shadow-card sm:p-10">
        <div className="flex size-12 items-center justify-center rounded-full bg-cyan-soft text-cyan-deep">
          <Check className="size-6" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-fg">
          {quiz.successTitle}
        </h3>
        <p className="mt-3 text-lg text-muted">{quiz.successText}</p>
        <Button asChild variant="whatsapp" size="lg" className="mt-8">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            Открыть WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl bg-surface p-6 shadow-card sm:p-8"
      noValidate
    >
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Шаги заявки">
        {["Объект", "Задачи", "Контакты"].map((label, index) => (
          <li key={label} className="flex flex-col gap-2">
            <span
              className={cn(
                "h-1 rounded-full",
                index <= step ? "bg-cyan" : "bg-line",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                index <= step ? "text-fg" : "text-subtle",
              )}
            >
              {index + 1}. {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <fieldset>
          <legend className="font-display text-xl font-semibold tracking-tight">
            Тип объекта
          </legend>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quiz.objectTypes.map((item) => {
              const selected = objectType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setObjectType(item.id);
                    setErrors((e) => ({ ...e, objectType: "" }));
                  }}
                  className={cn(
                    "h-14 rounded-xl border text-sm font-medium transition-[border-color,background-color] duration-150",
                    selected
                      ? "border-cyan bg-cyan-soft text-navy"
                      : "border-line bg-paper text-fg hover:border-navy/20",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          {errors.objectType ? (
            <p className="mt-3 text-sm text-danger">{errors.objectType}</p>
          ) : null}
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset>
          <legend className="font-display text-xl font-semibold tracking-tight">
            Что нужно сделать
          </legend>
          <p className="mt-2 text-sm text-muted">Можно выбрать несколько.</p>
          <div className="mt-5 grid gap-3">
            {quiz.needs.map((item) => {
              const selected = needs.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    toggleNeed(item.id);
                    setErrors((e) => ({ ...e, needs: "" }));
                  }}
                  className={cn(
                    "flex h-14 items-center justify-between rounded-xl border px-4 text-left text-sm font-medium transition-[border-color,background-color] duration-150",
                    selected
                      ? "border-cyan bg-cyan-soft text-navy"
                      : "border-line bg-paper text-fg hover:border-navy/20",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border",
                      selected
                        ? "border-cyan bg-cyan text-surface"
                        : "border-line",
                    )}
                  >
                    {selected ? <Check className="size-3.5" /> : null}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.needs ? (
            <p className="mt-3 text-sm text-danger">{errors.needs}</p>
          ) : null}
        </fieldset>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            Как с вами связаться
          </h3>
          <div className="grid gap-2">
            <Label htmlFor="lead-name">Имя</Label>
            <Input
              id="lead-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              placeholder="Как к вам обращаться"
            />
            {errors.name ? (
              <p className="text-sm text-danger">{errors.name}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lead-phone">Телефон или WhatsApp</Label>
            <Input
              id="lead-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatKzPhone(e.target.value))}
              aria-invalid={Boolean(errors.phone)}
              placeholder="+7 778 715 25 17"
            />
            {errors.phone ? (
              <p className="text-sm text-danger">{errors.phone}</p>
            ) : null}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lead-comment">Комментарий</Label>
            <Textarea
              id="lead-comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Адрес объекта, сроки, что уже есть на объекте"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setStep((s) => s - 1)}
          >
            <ChevronLeft className="size-4" />
            Назад
          </Button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <Button type="button" variant="primary" size="lg" onClick={nextStep}>
            Далее
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="lg">
            {quiz.submitLabel}
          </Button>
        )}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-subtle">
        Заявка уйдёт в WhatsApp
      </p>
    </form>
  );
}
