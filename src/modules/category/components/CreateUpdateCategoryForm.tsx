import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormattedMessage } from 'react-intl';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { NewCategory } from '@/modules/category/hooks/schema/useAddCategorySchema';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TopRatedIcon } from '@/modules/category/components/categoryIcons/TopRated';
import { EducationIcon } from '@/modules/category/components/categoryIcons/EducationIcon';

type TProps = {
  children: ReactNode;
  form: UseFormReturn<NewCategory>;
  onSubmitAction: SubmitHandler<NewCategory>;
};

export const CreateUpdateCategoryForm = ({
  form,
  onSubmitAction,
  children,
}: TProps): ReactNode => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        className="w-1/2 space-y-2"
      >
        <FormField
          defaultValue={''}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={'Name of the category'}
                  id={'name'}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={''}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={true}>
                <FormattedMessage
                  defaultMessage={'Description'}
                  id={'description'}
                />
              </FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue={''}
          control={form.control}
          name="categoryIcon"
          render={({ field }) => (
            <FormItem>
              <FormLabel isRequired={false}>
                <FormattedMessage
                  defaultMessage={'Icon for the category'}
                  id={'categoryIcon'}
                />
              </FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue="topRated"
                  name={field.name}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="education" id="education">
                      <EducationIcon className="size-8" />
                    </RadioGroupItem>
                    <Label htmlFor="">Education Icon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="topRated" id="topRated">
                      <TopRatedIcon className="size-8" />
                    </RadioGroupItem>
                    <Label htmlFor="topRated">Top rated icon</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <br />
        {children}
      </form>
    </Form>
  );
};
